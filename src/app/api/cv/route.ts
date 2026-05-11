import { NextResponse } from "next/server";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export async function GET() {
  try {
    const filePath = join(process.cwd(), "public", "SadokDridiResume.pdf");
    const file = readFileSync(filePath);

    return new NextResponse(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="SadokDridiResume.pdf"',
        "Content-Length": String(file.length),
      },
    });
  } catch {
    return new NextResponse("File not found", { status: 404 });
  }
}
