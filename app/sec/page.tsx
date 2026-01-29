import SecClient from "./SecClient";

export const metadata  = {
  title: "حساب معدل المرحلة الثانوية - حاسبة معدلي",
  description:
    "احسب معدل المرحلة الثانوية بسهولة ودقة باستخدام موقع معدلي. أدخل درجاتك واحصل على المعدل النهائي فورًا وفق نظام وزارة التعليم بالسعودية.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://mo3dly.github.io/sec",
  },
  openGraph: {
    title: "حساب معدل المرحلة الثانوية - حاسبة معدلي",
    description:
      "احسب معدل الدراسي للمرحلة الثانوية بسهولة وبدون تعقيد وفق نظام وزارة التعليم السعودية.",
    url: "https://mo3dly.github.io/sec",
    siteName: "حاسبة معدلي",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "حساب معدل المرحلة الثانوية - حاسبة معدلي",
    description:
      "احسب معدل الدراسي للمرحلة الثانوية بسهولة وبدون تعقيد وفق نظام وزارة التعليم السعودية.",
  },
};

export default function Page() {
  return <SecClient />;
}