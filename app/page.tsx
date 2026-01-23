import HomeClient from "./HomeClient";

export const metadata  = {
  title: "حاسبة معدلي - احسب معدلك الدراسي",
  description: "موقع حاسبة معدلي لحساب المعدل الدراسي للمرحلة المتوسطة والثانوية في السعودية. احسب معدلك بسهولة وبدقة وفق نظام وزارة التعليم.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://mo3dly.github.io/",
  },
  openGraph: {
    title: "حاسبة معدلي - احسب معدلك الدراسي",
    description:
      "موقع حاسبة معدلي لحساب المعدل الدراسي للمرحلة المتوسطة والثانوية في السعودية. احسب معدلك بسهولة وبدقة وفق نظام وزارة التعليم.",
    url: "https://mo3dly.github.io/",
    siteName: "حاسبة معدلي",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "حاسبة معدلي - احسب معدلك الدراسي",
    description:
      "موقع حاسبة معدلي لحساب المعدل الدراسي للمرحلة المتوسطة والثانوية في السعودية. احسب معدلك بسهولة وبدقة وفق نظام وزارة التعليم.",
  },
};

export default function Page() {
  return <HomeClient />;
}