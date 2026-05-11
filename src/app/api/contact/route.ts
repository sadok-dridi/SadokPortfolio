import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function formatTelegramMessage(data: ContactFormData): string {
  return [
    "📬 *New Contact Form Submission*",
    "",
    `*Name:* ${escapeMd(data.name)}`,
    `*Email:* ${escapeMd(data.email)}`,
    `*Subject:* ${escapeMd(data.subject)}`,
    "",
    `*Message:*`,
    escapeMd(data.message),
  ].join("\n");
}

function escapeMd(text: string): string {
  return text
    .replace(/([_*[\]()~`>#+\-=|{}.!])/g, "\\$1")
    .replace(/\n/g, "\n");
}

async function sendToTelegram(text: string): Promise<{ ok: boolean }> {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text,
      parse_mode: "MarkdownV2",
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Telegram API error: ${err}`);
  }

  return response.json();
}

export async function POST(request: NextRequest) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID env vars");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  let body: ContactFormData;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, subject, message } = body;

  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  if (name.length > 100 || subject.length > 200 || message.length > 5000) {
    return NextResponse.json(
      { error: "Field length exceeds limit" },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 }
    );
  }

  try {
    const text = formatTelegramMessage({ name, email, subject, message });
    await sendToTelegram(text);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send Telegram message:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
