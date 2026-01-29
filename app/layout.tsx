import { Cairo } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: {
    default: "معدلي الدراسي",
  },
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