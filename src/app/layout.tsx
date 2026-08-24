import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const notoSans = Noto_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-noto-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Агаар — Утаанаас сэргийлэх систем",
    template: "%s | Агаар",
  },
  description:
    "Утаа, агаарын бохирдлоос урьдчилан сэргийлэх мэдээ, зөвлөгөө, агаарын чанарын индексийн мэдээлэл.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn" className={`${notoSans.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[var(--background)] font-sans text-slate-900 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
