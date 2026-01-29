import HomeClient from "./HomeClient";

export const metadata  = {
  title: "حاسبة معدلي - احسب معدلك الدراسي",
  description: "موقع حاسبة معدلي لحساب المعدل الدراسي للمرحلة المتوسطة والثانوية في السعودية. احسب معدلك بسهولة وبدقة وفق نظام وزارة التعليم.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://mo3dly.github.io",
  },
  openGraph: {
    title: "حاسبة معدلي - احسب معدلك الدراسي",
    description: "موقع حاسبة معدلي يساعد طلاب المرحلة المتوسطة والثانوية في السعودية على حساب المعدل الدراسي بسهولة ودقة، وفق نظام وزارة التعليم بالسعودية.",
    url: "https://mo3dly.github.io",
    siteName: "حاسبة معدلي",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "حاسبة معدلي - احسب معدلك الدراسي",
    description:
      "موقع حاسبة معدلي يساعد طلاب المرحلة المتوسطة والثانوية في السعودية على حساب المعدل الدراسي بسهولة ودقة، وفق نظام وزارة التعليم بالسعودية.",
  },
};

export default function Page() {
  return <HomeClient />;
}