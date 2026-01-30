import { Cairo } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { describe } from "node:test";

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: {
    default: "حاسبة معدلي - احسب معدلك الدراسي",
    description: "معدلي خدمة إلكترونية لحساب المعدل الدراسي بدقة لطلاب المتوسطة والثانوية في السعودية وفق آلية وزارة التعليم."
  },
  keywords: [
    "حاسبة المعدل",
    "معدل اول متوسط",
    "معدل ثاني متوسط",
    "معدل ثالث متوسط",
    "معدل اول ثانوي",
    "معدل ثاني ثانوي",
    "معدل ثالث ثانوي",
    "حاسبة معدلي",
    "المعدل الدراسي",
    "نظام التعليم السعودي",
    "المرحلة المتوسطة",
    "المرحلة الثانوية",
    "حساب المعدل الدراسي",
    "موقع معدلي",
    "حساب المعدل التراكمي",
    "حاسبة المعدل الدراسي",
    "معدلي",
    "وزارة التعليم السعودي",
    "حساب المعدل بسهولة",
    "موقع حساب المعدل",
    "حاسبة معدلي الدراسي",
    "موقع معدلي الدراسي",
    "حاسبة المعدل للطلاب",
    "المعدل الدراسي في السعودية",
    "حاسبة المعدل للمرحلة المتوسطة",
    "حاسبة المعدل للمرحلة الثانوية",
    "موقع حساب المعدل للطلاب",
    "حاسبة المعدل بدقة",
    "موقع معدلي بدقة",
    "حاسبة المعدل وفق نظام وزارة التعليم السعودي",
    "احسب معدلك",
    "موقع احسب معدلك",
    "حاسبة معدلي احسب معدلك",
    "احسب معدلك الدراسي",
    "موقع احسب معدلك الدراسي",
    "حاسبة معدلي احسب معدلك الدراسي",
    "حاسبة المعدل السعودية",
    "موقع المعدل السعودية",
    "حاسبة معدلي السعودية",
    "معدلي الدراسي السعودية",
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} min-h-screen flex flex-col font-sans antialiased"`}>
        <Header />
        {children}
        <Footer />
        <GoogleAnalytics gaId="G-46KDT1HD6W" />
      </body>
    </html>
  );
}
