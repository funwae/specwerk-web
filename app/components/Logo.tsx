type LogoProps = {
  variant?: "default" | "icon-only";
  showStudio?: boolean;
  className?: string;
};

export function Logo({ variant = "default", showStudio = false, className = "" }: LogoProps) {
  if (variant === "icon-only") {
    return (
      <div className={`flex items-center ${className}`}>
        <div className="w-8 h-8 bg-specwerkRed rounded flex-shrink-0 relative overflow-hidden">
          <div className="absolute inset-0 flex flex-col justify-center items-start px-2 space-y-1">
            <div className="w-full h-0.5 bg-white" />
            <div className="w-4/5 h-0.5 bg-white" />
            <div className="w-3/5 h-0.5 bg-white" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Icon: 32x32 red square */}
      <div className="w-8 h-8 bg-specwerkRed rounded flex-shrink-0 relative overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-center items-start px-2 space-y-1">
          <div className="w-full h-0.5 bg-white" />
          <div className="w-4/5 h-0.5 bg-white" />
          <div className="w-3/5 h-0.5 bg-white" />
        </div>
      </div>

      {/* Wordmark text block */}
      <div className="flex flex-col leading-tight">
        {/* SPECWERK main line */}
        <span className="font-display font-medium text-[13px] md:text-[14px] tracking-[0.22em] text-specwerkBlack uppercase">
          SPECWERK
        </span>

        {/* STUDIO tagline (optional) */}
        {showStudio && (
          <span className="font-mono text-[9px] tracking-[0.26em] text-specwerkBlack/60 uppercase">
            STUDIO
          </span>
        )}
      </div>
    </div>
  );
}
