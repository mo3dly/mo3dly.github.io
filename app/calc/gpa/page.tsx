import Client from "./Client";

export const metadata  = {
  title: "حساب المعدل التراكمي الثانوي - حاسبة معدلي",
  description: "حساب المعدل التراكمي للمرحلة الثانوية بسهولة وبدون تعقيد.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://mo3dly.github.io/calc/gpa",
  },
  openGraph: {
    title: "حساب المعدل التراكمي  الثانوي - حاسبة معدلي",
    description:
      "حساب المعدل التراكمي للمرحلة الثانوية بسهولة وبدون تعقيد.",
    url: "https://mo3dly.github.io/calc/gpa",
    siteName: "حاسبة معدلي",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "حساب المعدل التراكمي الثانوي - حاسبة معدلي",
    description:
      "حساب المعدل التراكمي للمرحلة الثانوية بسهولة وبدون تعقيد.",
  },
};

export default function Page() {
  return <Client />;
}