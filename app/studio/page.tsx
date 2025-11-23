"use client";

import { useState } from "react";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { Pill } from "../components/ui/Pill";
import { WorkflowMap, WorkflowStepMeta } from "../components/WorkflowMap";

type RunResult = {
  ok: boolean;
  date?: string;
  steps?: Record<string, any>;
  error?: string;
};

const WORKFLOW_STEPS: WorkflowStepMeta[] = [
  {
    id: "fetch_invoices",
    label: "Fetch invoices",
    kind: "tool",
    description: "Pull invoices for the selected date.",
  },
  {
    id: "fetch_payments",
    label: "Fetch payments",
    kind: "tool",
    description: "Pull bank payments for the same period.",
  },
  {
    id: "reconcile",
    label: "Reconcile",
    kind: "tool",
    description: "Match invoices and payments, compute totals.",
  },
  {
    id: "analyze_unmatched",
    label: "Analyze unmatched",
    kind: "agent",
    description: "Let the model describe key issues.",
  },
  {
    id: "build_tasks",
    label: "Build tasks",
    kind: "tool",
    description: "Turn unmatched items into a task list.",
  },
  {
    id: "summarize_for_finance",
    label: "Summarize for finance",
    kind: "agent",
    description: "Final summary for finance and ops.",
  },
];

export default function StudioPage() {
  const [date, setDate] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RunResult | null>(null);

  const runDemo = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/studio/workflows/invoice-recon/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: date || undefined }),
      });
      const json = await res.json();
      setResult(json);
    } catch (e: any) {
      setResult({ ok: false, error: e?.message ?? "Request failed" });
    } finally {
      setLoading(false);
    }
  };

  const steps = result?.steps ?? {};
  const summary =
    steps["summarize_for_finance"]?.summary ??
    steps["summarize_for_finance"]?.text;

  const resolvedDate =
    result?.date ?? (date || new Date().toISOString().slice(0, 10));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      {/* Top intro + map */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="font-display text-2xl md:text-3xl">
              SpecWerk Studio Demo
            </h1>
            <p className="text-sm text-specwerkBlack/70 max-w-xl">
              This demo shows a full daily AR workflow: tools fetch and
              reconcile data, agents analyze issues and summarize the run.
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 text-[11px] text-specwerkBlack/60">
            <Pill tone="ok">Live</Pill>
            <span className="font-mono">
              workflow: <span className="text-specwerkBlack/80">invoice-recon</span>
            </span>
          </div>
        </div>

        <WorkflowMap steps={WORKFLOW_STEPS} />
      </section>

      {/* Run controls + execution trace */}
      <Card>
        <CardHeader
          title="Run workflow"
          subtitle="Set the date and run the full reconciliation automation end-to-end."
        />
        <CardBody>
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-specwerkBlack/60 mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border border-specwerkLine/80 bg-white px-2 py-1 text-sm rounded-md"
              />
              <p className="mt-1 text-[11px] text-specwerkBlack/60">
                Leave blank to use today&apos;s date.
              </p>
            </div>
            <button
              onClick={runDemo}
              disabled={loading}
              className="px-4 py-2 bg-specwerkRed text-white text-[11px] font-semibold uppercase tracking-[0.18em] hover:bg-specwerkBlack transition disabled:opacity-50"
            >
              {loading ? "Running..." : "Run daily AR workflow"}
            </button>
          </div>

          {result && (
            <div className="space-y-4 mt-2">
              {!result.ok && (
                <div className="border border-red-400 bg-red-50 text-sm text-red-700 px-3 py-2 rounded-md">
                  Error: {result.error ?? "Unknown error"}
                </div>
              )}

              {result.ok && (
                <>
                  <div className="text-xs text-specwerkBlack/60 font-mono">
                    Run date:{" "}
                    <span className="text-specwerkBlack/90">{resolvedDate}</span>
                  </div>

                  {/* Step-by-step trace */}
                  <div className="grid md:grid-cols-3 gap-3 mt-2">
                    {WORKFLOW_STEPS.map((meta) => (
                      <div
                        key={meta.id}
                        className="bg-specwerkBg border border-specwerkLine/60 rounded-md overflow-hidden"
                      >
                        <div className="px-3 py-2 border-b border-specwerkLine/60 flex items-center justify-between gap-2">
                          <div className="text-[11px] uppercase tracking-[0.18em] text-specwerkBlack/70">
                            {meta.label}
                          </div>
                          <Pill tone={meta.kind === "tool" ? "default" : "ok"}>
                            {meta.kind === "tool" ? "Tool" : "Agent"}
                          </Pill>
                        </div>
                        <pre className="text-[11px] bg-black/90 text-white p-2 overflow-x-auto">
                          {JSON.stringify(steps[meta.id] ?? {}, null, 2)}
                        </pre>
                      </div>
                    ))}
                  </div>

                  {/* Final summary */}
                  <div className="mt-3 bg-white border border-specwerkLine/80 rounded-md">
                    <div className="px-3 py-2 border-b border-specwerkLine/60 flex items-center justify-between">
                      <div className="text-[11px] uppercase tracking-[0.18em] text-specwerkBlack/70">
                        Final summary · summarize_for_finance
                      </div>
                      <Pill tone="ok">Agent</Pill>
                    </div>
                    <div className="px-3 py-3 text-sm text-specwerkBlack/85 whitespace-pre-line">
                      {summary ?? "No summary returned."}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

