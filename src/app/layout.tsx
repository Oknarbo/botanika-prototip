import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Botanika | AI-first Grow Shop",
  description:
    "Prvi AI-powered grow shop u regiji. Stručni savjeti, dijagnostika biljaka i kompletan setup builder — sve u jednom chatu.",
  keywords: ["grow shop", "indoor growing", "AI asistent", "Hrvatska", "LED", "growbox"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-botanika-dark text-botanika-cream">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
