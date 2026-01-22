import HomeClient from "./HomeClient";

export const metadata = {
  title: "معدلي الدراسي - الصفحة الرئيسية",
  description:
    "معدلي موقع دقيق لحساب المعدل الدراسي لطلاب المرحلتين المتوسطة والثانوية في السعودية وفق نظام وزارة التعليم.",
  alternates: {
    canonical: "https://mo3dly.github.io/",
  },
};

export default function Page() {
  return <HomeClient />;
}