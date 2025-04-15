"use client";
import { ReactNode, useEffect, useRef, useState } from "react";

interface ISpotlightProps {
  children?: ReactNode;
  isEnabled: boolean;
  onNext: () => void;
  onPrev?: () => void;
  notes: {
    title: string;
    content: string;
  };
  isLast?: boolean;
  notesContainerClassName?: string;
  icon?: ReactNode;
  iconPosition?: "bottom" | "top";
  iconContainerClassName?: string;
}

const Spotlight = ({
  children,
  isEnabled,
  notes,
  onNext,
  onPrev,
  isLast,
  notesContainerClassName,
  icon,
  iconPosition,
  iconContainerClassName,
}: ISpotlightProps) => {
  const [rect, setRect] = useState<DOMRect>();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const highlightedArea = () => {
      const rect = contentRef.current?.getBoundingClientRect();
      setRect(rect);
    };
    highlightedArea();

    window.addEventListener("resize", highlightedArea);
    return () => {
      window.removeEventListener("resize", highlightedArea);
    };
  }, [contentRef, isEnabled]);

  return (
    <div className={children ? "relative" : undefined}>
      {isEnabled ? (
        <div className={`z-10`}>
          <div className="fixed inset-0 bg-black/90 cursor-default z-20">
            {rect && children && (
              <div
                className=" bg-white/50 absolute z-20 w-full p-14 rounded-xl"
                style={{
                  top: rect?.top - 20,
                  height: rect?.height + 40,
                  width: rect?.width + 30,
                  left: rect?.left - 15,
                }}
              />
            )}
          </div>

          {/* Spotlighted Component */}
          <div ref={contentRef} className="relative z-20">
            {children}
          </div>

          {/* Notes */}
          <div
            className={`z-20 text-white absolute ${notesContainerClassName}`}
          >
            {iconPosition === "top" && (
              <div className={`relative ${iconContainerClassName}`}>{icon}</div>
            )}
            <div className="text-3xl font-bold">{notes.title}</div>
            <div className="mt-5">{notes.content}</div>
            <div className="mt-5 flex gap-2">
              {onPrev && (
                <button
                  onClick={onPrev}
                  className="px-5 py-2 bg-white  border text-black rounded-full"
                >
                  Sebelumnya
                </button>
              )}
              <button
                onClick={onNext}
                className="px-5 py-2 bg-blue-500 rounded-full"
              >
                {isLast ? "OK, Mengerti!" : "Selanjutnya"}
              </button>
            </div>
            {iconPosition === "bottom" && (
              <div className={`relative ${iconContainerClassName}`}>{icon}</div>
            )}
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default Spotlight;
