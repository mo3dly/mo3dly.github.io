import PrivacyClient from "./PrivacyClient";

export const metadata  = {
  title: "سياسة الخصوصية - حاسبة معدلي ",
  description: "اطلع على سياسة الخصوصية لموقع معدّلي لفهم كيفية تعاملنا مع بياناتك وحمايتها.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://mo3dly.github.io/privacy-policy",
  },
  openGraph: {
    title: "سياسة الخصوصية - حاسبة معدلي",
    description:
      "اطلع على سياسة الخصوصية لموقع معدّلي لفهم كيفية تعاملنا مع بياناتك وحمايتها.",
    url: "https://mo3dly.github.io/privacy-policy",
    siteName: "حاسبة معدلي",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "سياسة الخصوصية - حاسبة معدلي",
    description:
      "اطلع على سياسة الخصوصية لموقع معدّلي لفهم كيفية تعاملنا مع بياناتك وحمايتها.",
  },
};

export default function Page() {
  return <PrivacyClient />;
}