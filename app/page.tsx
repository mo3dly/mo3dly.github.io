import HomeClient from "./HomeClient";

export const metadata  = {
  title: "حاسبة معدلي - احسب معدلك الدراسي",
  description: "معدلي خدمة إلكترونية لحساب المعدل الدراسي بدقة لطلاب المتوسطة والثانوية في السعودية وفق آلية وزارة التعليم.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://mo3dly.github.io",
  },
  openGraph: {
    title: "حاسبة معدلي - احسب معدلك الدراسي",
    description: "معدلي خدمة إلكترونية لحساب المعدل الدراسي بدقة لطلاب المتوسطة والثانوية في السعودية وفق آلية وزارة التعليم.",
    url: "https://mo3dly.github.io",
    siteName: "حاسبة معدلي",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "حاسبة معدلي - احسب معدلك الدراسي",
    description:
      "معدلي خدمة إلكترونية لحساب المعدل الدراسي بدقة لطلاب المتوسطة والثانوية في السعودية وفق آلية وزارة التعليم.",
  },
};

export default function Page() {
  return <HomeClient />;
}