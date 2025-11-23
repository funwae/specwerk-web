import { NextRequest, NextResponse } from "next/server";
import {
  demoFetchInvoices,
  demoFetchPayments,
  matchInvoices,
  buildTasksFromRecon,
} from "@/lib/demoWorkflow";
import {
  analyzeUnmatchedWithDeepseek,
  summarizeRunForFinance,
} from "@/lib/deepseek";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const date =
      typeof body.date === "string" && body.date.length > 0
        ? body.date
        : new Date().toISOString().slice(0, 10);

    // Step 1: fetch invoices
    const invoices = await demoFetchInvoices(date);

    // Step 2: fetch payments
    const payments = await demoFetchPayments(date);

    // Step 3: reconcile
    const recon = matchInvoices(invoices, payments);

    // Step 4: analyze unmatched (agent)
    const analysis_text = await analyzeUnmatchedWithDeepseek(recon, date);

    // Step 5: build tasks (tool)
    const tasks = buildTasksFromRecon(recon);

    // Step 6: summarize for finance (agent)
    const summary = await summarizeRunForFinance(recon, tasks, date);

    return NextResponse.json({
      ok: true,
      date,
      steps: {
        fetch_invoices: { invoices },
        fetch_payments: { payments },
        reconcile: recon,
        analyze_unmatched: { analysis_text },
        build_tasks: { tasks },
        summarize_for_finance: { summary },
      },
    });
  } catch (err: any) {
    console.error("Invoice recon demo error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}

