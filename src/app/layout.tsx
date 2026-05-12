import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import { PageTransitionProvider } from "@/components/layout/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sadok | AI & Full Stack Developer",
  description: "AI & Automation Developer crafting digital experiences that blend beautiful design with powerful functionality. Specializing in modern web applications, cloud infrastructure, and AI-powered solutions.",
  keywords: ["AI & Automation Developer", "Full Stack Developer", "Web Developer", "React", "Next.js", "TypeScript", "Portfolio"],
  authors: [{ name: "Sadok" }],
  openGraph: {
    title: "Sadok | AI & Full Stack Developer",
    description: "AI & Automation Developer crafting digital experiences that make an impact.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-zinc-950 text-white" suppressHydrationWarning>
        <SmoothScroll>
          <CustomCursor />
          <PageTransitionProvider>
            {children}
          </PageTransitionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
