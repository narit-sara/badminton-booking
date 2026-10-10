import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers"; // 1. นำเข้า Providers ที่สร้างไว้

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Teebad Maija - ระบบจองสนามแบดมินตัน",
  description: "ระบบจองสนามแบดมินตันออนไลน์",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="th"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      {/* เพิ่ม bg-slate-100 สำหรับโหมดสว่าง และ dark:bg-[#030712] สำหรับโหมดมืด */}
      <body className="min-h-full flex flex-col bg-slate-100 dark:bg-[#030712] text-slate-900 dark:text-white transition-colors duration-300">
        {/* 2. นำ <Providers> มาครอบ {children} ตรงนี้ */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}