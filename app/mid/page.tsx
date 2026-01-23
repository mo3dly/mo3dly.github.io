import MidClient from "./MidClient";

export const metadata  = {
  title: "حساب معدل المرحلة المتوسطة - معدلي",
  description:
    "احسب معدل الصف الاول والثاني والثالث متوسط بسهولة ودقة باستخدام موقع معدلي. أدخل درجاتك واحصل على المعدل النهائي فورًا حسب نظام وزارة التعليم بالسعودية.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://mo3dly.github.io/mid/",
  },
  openGraph: {
    title: "حساب معدل المرحلة المتوسطة - معدلي",
    description:
      "حاسبة معدل الصف الاول والثاني والثالث متوسط حسب نظام وزارة التعليم بالسعودية. نتيجة فورية وسهلة.",
    url: "https://mo3dly.github.io/mid/",
    siteName: "معدلي",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "حساب الصف الاول والثاني والثالث متوسط - معدلي",
    description:
      "احسب معدلك في الصف الاول والثاني والثالث متوسط بسهولة وبدون تعقيد.",
  },
};

export default function Page() {
  return <MidClient />;
}