"use client";

import { Pill } from "./ui/Pill";

export type WorkflowStepMeta = {
  id: string;
  label: string;
  kind: "tool" | "agent";
  description?: string;
};

export function WorkflowMap({ steps }: { steps: WorkflowStepMeta[] }) {
  return (
    <div className="bg-white border border-specwerkLine/80 rounded-md shadow-sm px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-specwerkBlack/60">
            Workflow Map
          </div>
          <div className="text-sm text-specwerkBlack/75">
            Daily AR run · from tools to agent summaries
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-[10px] text-specwerkBlack/60">
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-specwerkBlack" />
            TOOL
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full border border-specwerkRed" />
            AGENT
          </span>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <div className="flex items-center gap-6 pb-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-3">
              <div className="flex flex-col items-center min-w-[120px]">
                <div className="flex items-center justify-center">
                  <div
                    className={[
                      "px-3 py-1 rounded-full border text-xs text-center whitespace-nowrap",
                      step.kind === "tool"
                        ? "border-specwerkBlack bg-specwerkBlack text-white"
                        : "border-specwerkRed text-specwerkBlack bg-white",
                    ].join(" ")}
                  >
                    {step.label}
                  </div>
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-specwerkBlack/60">
                  {step.kind === "tool" ? "TOOL" : "AGENT"}
                </div>
                {step.description && (
                  <div className="mt-1 text-[10px] text-center text-specwerkBlack/60 max-w-[160px]">
                    {step.description}
                  </div>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className="h-px w-8 bg-specwerkLine/70" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-[10px] text-specwerkBlack/60">
        <Pill>Spec-defined order</Pill>
        <Pill>Tools do the work</Pill>
        <Pill>Agents narrate & classify</Pill>
      </div>
    </div>
  );
}

