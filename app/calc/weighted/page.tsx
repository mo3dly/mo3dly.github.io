import WeightedScore from "./Client";

export const metadata  = {
  title: "حساب النسبة الموزونة - حاسبة معدلي",
  description: "حساب النسبة الموزونة المطلوبة للقبول الجامعي مع دعم لاختبار ستيب.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://mo3dly.github.io/calc/weighted",
  },
  openGraph: {
    title: "حساب النسبة الموزونة - حاسبة معدلي",
    description:
      "حساب النسبة الموزونة المطلوبة للقبول الجامعي مع دعم لاختبار ستيب.",
    url: "https://mo3dly.github.io/calc/weighted",
    siteName: "حاسبة معدلي",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "حساب النسبة الموزونة - حاسبة معدلي",
    description:
      "حساب النسبة الموزونة المطلوبة للقبول الجامعي مع دعم لاختبار ستيب.",
  },
};

export default function Page() {
  return <WeightedScore />;
}