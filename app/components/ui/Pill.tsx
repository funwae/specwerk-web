import type { ReactNode } from "react";

type PillProps = {
  children: ReactNode;
  className?: string;
  tone?: "default" | "ok";
};

export function Pill({ children, className = "", tone = "default" }: PillProps) {
  const baseClasses = "inline-block px-2 py-1 text-[10px] uppercase tracking-wide";
  const toneClasses =
    tone === "ok"
      ? "bg-specwerkOk/20 text-specwerkBlack border border-specwerkOk/40"
      : "bg-black/5 text-specwerkBlack border border-black/10";

  return (
    <span className={`${baseClasses} ${toneClasses} ${className}`}>
      {children}
    </span>
  );
}

