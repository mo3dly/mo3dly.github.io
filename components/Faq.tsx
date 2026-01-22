"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type FaqContextType = {
  active: number | null;
  setActive: (index: number | null) => void;
};

const FaqContext = createContext<FaqContextType | null>(null);

type FaqProps = {
  children: ReactNode;
};

export function Faq({ children }: FaqProps) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <FaqContext.Provider value={{ active, setActive }}>
          <div className="space-y-4 max-w-3xl mx-auto">
            {children}
          </div>
    </FaqContext.Provider>
  );
}

type FaqItemProps = {
  index: number;
  children: (open: boolean, toggle: () => void) => ReactNode;
};

Faq.Item = function Item({ index, children }: FaqItemProps) {
  const context = useContext(FaqContext);
  if (!context) throw new Error("Faq.Item must be used inside <Faq />");

  const { active, setActive } = context;
  const isOpen = active === index;

  const toggle = () => setActive(isOpen ? null : index);

  return (
    <div
      className="border rounded-lg overflow-hidden"
      style={{ borderColor: "#e5e7eb" }}
    >
      {children(isOpen, toggle)}
    </div>
  );
};

type FaqQuestionProps = {
  children: ReactNode;
  isOpen: boolean;
  onClick: () => void;
};

Faq.Question = function Question({
  children,
  isOpen,
  onClick,
}: FaqQuestionProps) {
  return (
    <button
      onClick={onClick}
      aria-expanded={isOpen}
      className="w-full flex justify-between items-center p-4 text-right hover:bg-gray-50 transition-colors duration-200"
    >
      <span className="font-semibold text-lg flex-1" style={{ color: "#33365B" }}>
        {children}
      </span>
      <span className="text-xl ml-4" style={{ color: "#33365B" }}>
        {isOpen ? "−" : "+"}
      </span>
    </button>
  );
};

type FaqAnswerProps = {
  children: ReactNode;
  isOpen: boolean;
};

Faq.Answer = function Answer({ children, isOpen }: FaqAnswerProps) {
  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="p-4 pt-0">
        <div className="border-t pt-4" style={{ borderColor: "#e5e7eb" }}>
          <p className="leading-relaxed" style={{ color: "#6c757d" }}>
            {children}
          </p>
        </div>
      </div>
    </div>
  );
};