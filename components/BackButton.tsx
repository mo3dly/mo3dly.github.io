"use client";

import { useRouter } from "next/navigation";

type BackButtonProps = {
  fallback?: string;
  variant?: "top" | "bottom";
};

export default function BackButton({
  fallback = "/",
  variant = "top",
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  if (variant === "top") {
    return (
      <button
        onClick={handleBack}
        aria-label="الرجوع"
        className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#33365B]"
        style={{ color: "#6c757d" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M15 6l-6 6 6 6" />
        </svg>
        رجوع
      </button>
    );
  }

  return (
    <div className="mt-12 flex justify-center">
      <button
        onClick={handleBack}
        className="flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
        style={{ backgroundColor: "#33365B", minWidth: "220px" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="transition-transform duration-300 group-hover:-translate-x-1"
        >
          <path d="M15 6l-6 6 6 6" />
        </svg>
        الرجوع
      </button>
    </div>
  );
}