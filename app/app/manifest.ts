import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "حاسبة معدلي",
    short_name: "حاسبة معدلي",
    description: "موقع حاسبة معدلي يساعد طلاب المرحلة المتوسطة والثانوية في السعودية على حساب المعدل الدراسي بسهولة ودقة، وفق نظام وزارة التعليم السعودي.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3d00a0",
    lang: "ar",
    dir: "rtl",
    icons: [
      { src: "/icons/mo3dly.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/mo3dly.png", sizes: "180x180", type: "image/png" },
      { src: "/icons/mo3dly.png", sizes: "152x152", type: "image/png" },
      { src: "/icons/mo3dly.png", sizes: "144x144", type: "image/png" },
      { src: "/icons/mo3dly.png", sizes: "128x128", type: "image/png" },
      { src: "/icons/mo3dly.png", sizes: "96x96", type: "image/png" },
      { src: "/icons/mo3dly.png", sizes: "72x72", type: "image/png" },
      { src: "/icons/mo3dly.png", sizes: "48x48", type: "image/png" },
    ],
  };
}