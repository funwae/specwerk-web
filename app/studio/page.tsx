"use client";

import { useState } from "react";
import Link from "next/link";

type RunResult = {
  ok: boolean;
  date?: string;
  steps?: any;
  error?: string;
};

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

  const recon = result?.steps?.reconcile;
  const summary = result?.steps?.summarize?.summary as string | undefined;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">SpecWerk Studio (Demo)</h1>
        <p className="text-sm text-black/70 max-w-xl">
          This is a live demo of SpecWerk running a single workflow: invoice reconciliation.
          It uses deterministic tools and a thin DeepSeek-powered agent layer to summarize results.
        </p>
        <div className="flex gap-3 pt-2">
          <Link
            href="/studio/upload"
            className="text-xs text-specwerkRed hover:text-black uppercase tracking-wide"
          >
            Upload Spec →
          </Link>
        </div>
      </header>

      <section className="space-y-3">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="block text-xs uppercase tracking-wide text-black/60 mb-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-black/20 bg-white px-2 py-1 text-sm"
            />
            <p className="text-[11px] text-black/50 mt-1">
              Leave blank to use today&apos;s date.
            </p>
          </div>
          <button
            onClick={runDemo}
            disabled={loading}
            className="px-4 py-2 bg-specwerkRed text-white text-xs font-semibold uppercase tracking-wide hover:bg-black transition disabled:opacity-50"
          >
            {loading ? "Running..." : "Run Invoice Reconciliation"}
          </button>
        </div>
      </section>

      {result && (
        <section className="space-y-4">
          {!result.ok && (
            <div className="border border-red-400 bg-red-50 text-sm text-red-700 p-3">
              Error: {result.error ?? "Unknown error"}
            </div>
          )}

          {result.ok && (
            <>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white border border-black/10 p-3 text-sm">
                  <div className="text-xs uppercase tracking-wide text-black/60">
                    Step 1 · Invoices
                  </div>
                  <pre className="mt-1 text-[11px] bg-black/90 text-white p-2 overflow-x-auto rounded">
                    {JSON.stringify(result.steps?.fetch_invoices, null, 2)}
                  </pre>
                </div>
                <div className="bg-white border border-black/10 p-3 text-sm">
                  <div className="text-xs uppercase tracking-wide text-black/60">
                    Step 2 · Payments
                  </div>
                  <pre className="mt-1 text-[11px] bg-black/90 text-white p-2 overflow-x-auto rounded">
                    {JSON.stringify(result.steps?.fetch_payments, null, 2)}
                  </pre>
                </div>
                <div className="bg-white border border-black/10 p-3 text-sm">
                  <div className="text-xs uppercase tracking-wide text-black/60">
                    Step 3 · Reconciliation
                  </div>
                  <pre className="mt-1 text-[11px] bg-black/90 text-white p-2 overflow-x-auto rounded">
                    {JSON.stringify(recon, null, 2)}
                  </pre>
                </div>
              </div>

              <div className="bg-white border border-black/10 p-3">
                <div className="text-xs uppercase tracking-wide text-black/60 mb-1">
                  Step 4 · DeepSeek Summary
                </div>
                <p className="text-sm text-black/80 whitespace-pre-line">
                  {summary ?? "No summary returned."}
                </p>
              </div>
            </>
          )}
        </section>
      )}
    </div>
  );
}

