import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const siteUrl = process.env.PUBLIC_SITE_URL!;

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "معدلي الدراسي",
    template: "%s - معدلي الدراسي",
  },
 description: "معدلي موقع دقيق لحساب المعدل الدراسي لطلاب المرحلتين المتوسطة والثانوية في السعودية وفق نظام وزارة التعليم.",

  keywords: [
    "معدلي",
    "موقع معدلي",
    "معدلي الدراسي",
    "حساب المعدل",
    "حساب معدل المتوسط",
    "حساب معدل الثانوي",
    "المعدل الفصلي",
    "المعدل السنوي",
    "حاسبة المعدل",
    "حاسبة المعدل الدراسي",
    "الثانوي",
    "السعودية",
  ],

  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    title: "معدلي الدراسي",
    description: "معدلي أول موقع دقيق لحساب المعدل الدراسي لطلاب المرحلتين المتوسطة والثانوية في السعودية وفق نظام وزارة التعليم.",
    url: siteUrl,
    siteName: "معدلي الدراسي",
    type: "website",
  },

  metadataBase: new URL(siteUrl)
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} min-h-screen flex flex-col font-sans antialiased"`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}