import Script from "next/script";

type Grade = "7" | "8" | "9" | "10" | "11" | "12";

const gradeMap: Record<
  Grade,
  {
    stageName: string;
    stageUrl: string;
    gradeName: string;
  }
> = {
  "7": {
    stageName: "المرحلة المتوسطة",
    stageUrl: "https://mo3dly.github.io/mid/",
    gradeName: "أول متوسط"
  },
  "8": {
    stageName: "المرحلة المتوسطة",
    stageUrl: "https://mo3dly.github.io/mid/",
    gradeName: "ثاني متوسط"
  },
  "9": {
    stageName: "المرحلة المتوسطة",
    stageUrl: "https://mo3dly.github.io/mid/",
    gradeName: "ثالث متوسط"
  },
  "10": {
    stageName: "المرحلة الثانوية",
    stageUrl: "https://mo3dly.github.io/sec/",
    gradeName: "أول ثانوي"
  },
  "11": {
    stageName: "المرحلة الثانوية",
    stageUrl: "https://mo3dly.github.io/sec/",
    gradeName: "ثاني ثانوي"
  },
  "12": {
    stageName: "المرحلة الثانوية",
    stageUrl: "https://mo3dly.github.io/sec/",
    gradeName: "ثالث ثانوي"
  }
};

export default function BreadcrumbSchema({ grade }: { grade: Grade }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: "https://mo3dly.github.io/"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: gradeMap[grade].stageName,
        item: gradeMap[grade].stageUrl
      },
      {
        "@type": "ListItem",
        position: 3,
        name: gradeMap[grade].gradeName,
        item: `https://mo3dly.github.io/grades/${grade}/`
      }
    ]
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}