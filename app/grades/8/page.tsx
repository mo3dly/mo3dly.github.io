import GradeClient from "./GradeClient";

export const metadata  = {
  title: "حساب معدل الصف الثاني متوسط - حاسبة معدلي",
  description: "احسب معدل الصف الثاني متوسط بادق طريقة وفق نظام الحساب الخاص بوزارة التعليم في السعودية باستخدام حاسبة معدلي.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://mo3dly.github.io/grades/8",
  },
  openGraph: {
    title: "حساب معدل الصف الثاني متوسط - حاسبة معدلي",
    description:
      "احسب معدل الصف الثاني متوسط بادق طريقة وفق نظام الحساب الخاص بوزارة التعليم في السعودية باستخدام حاسبة معدلي.",
    url: "https://mo3dly.github.io/grades/8",
    siteName: "حاسبة معدلي",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "حساب معدل الصف الثاني متوسط - حاسبة معدلي",
    description:
      "احسب معدل الصف الثاني متوسط بادق طريقة وفق نظام الحساب الخاص بوزارة التعليم في السعودية باستخدام حاسبة معدلي.",
  },
};

export default function Page() {
  return <GradeClient />;
}