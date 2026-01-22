import FaqClient from "./FaqClient";

export const metadata = {
  title: "معدلي الدراسي - الاسئلة الشائعة",
  description: "الاسئلة الشائعة عن موقع معدلي وطريقة حساب المعدل",
  alternates: {
    canonical: "https://mo3dly.github.io/faq/",
  },
};

export default function Page() {
  return <FaqClient />;
}