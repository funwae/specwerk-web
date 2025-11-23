import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-white border border-black/10 p-4 ${className}`}>
      {children}
    </div>
  );
}

type CardHeaderProps = {
  title: string;
  subtitle?: string;
};

export function CardHeader({ title, subtitle }: CardHeaderProps) {
  return (
    <div className="mb-3">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-specwerkBlack">
        {title}
      </h3>
      {subtitle && (
        <p className="text-xs text-black/60 mt-1">{subtitle}</p>
      )}
    </div>
  );
}

type CardBodyProps = {
  children: ReactNode;
  className?: string;
};

export function CardBody({ children, className = "" }: CardBodyProps) {
  return <div className={className}>{children}</div>;
}

