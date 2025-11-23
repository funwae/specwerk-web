import type { ReactNode } from "react";

type PillProps = {
  children: ReactNode;
  className?: string;
};

export function Pill({ children, className = "" }: PillProps) {
  return (
    <span
      className={`inline-block px-2 py-1 text-[10px] uppercase tracking-wide bg-black/5 text-specwerkBlack border border-black/10 ${className}`}
    >
      {children}
    </span>
  );
}

