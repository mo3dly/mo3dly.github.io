import KFUPMWeightedScore from "./KFUPMWeightedScore";

export const metadata = {
  title: "حساب النسبة الموزونة لجامعة الملك فهد للبترول والمعادن - حاسبة معدلي",
  description: "اول أداة متخصصة في حساب النسبة الموزونة المطلوبة للقبول الجامعي في جامعة الملك فهد للبترول والمعادن للمساري المبكر والالحاقي.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://mo3dly.github.io/calc/kfupm-weighted",
  },
  openGraph: {
    title: "حساب النسبة الموزونة لجامعة الملك فهد للبترول والمعادن - حاسبة معدلي",
    description:
      "اول أداة متخصصة في حساب النسبة الموزونة المطلوبة للقبول الجامعي في جامعة الملك فهد للبترول والمعادن للمساري المبكر والالحاقي.",
    url: "https://mo3dly.github.io/calc/kfupm-weighted",
    siteName: "حاسبة معدلي",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "حساب النسبة الموزونة لجامعة الملك فهد للبترول والمعادن - حاسبة معدلي",
    description:
      "اول أداة متخصصة في حساب النسبة الموزونة المطلوبة للقبول الجامعي في جامعة الملك فهد للبترول والمعادن للمساري المبكر والالحاقي.",
  },
};

export default function KFUPMWeightedScorePage() {
  return <KFUPMWeightedScore />;
}
