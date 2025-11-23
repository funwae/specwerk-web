export type Invoice = {
  id: string;
  customer: string;
  amount: number;
  date: string;
};

export type Payment = {
  id: string;
  invoice_id: string;
  amount: number;
  date: string;
};

export type ReconciliationResult = {
  matched: { invoice: Invoice; payment: Payment }[];
  unmatched_invoices: Invoice[];
  unmatched_payments: Payment[];
  totals: {
    num_invoices: number;
    num_payments: number;
    num_matched: number;
    num_unmatched_invoices: number;
    num_unmatched_payments: number;
  };
};

export type Task = {
  id: string;
  kind: "invoice" | "payment";
  ref_id: string;
  description: string;
  suggested_owner: "finance" | "ops" | "support";
  priority: "low" | "medium" | "high";
};

export async function demoFetchInvoices(date: string): Promise<Invoice[]> {
  // Fake data for the demo
  return [
    { id: "INV-001", customer: "Acme", amount: 100.0, date },
    { id: "INV-002", customer: "Globex", amount: 200.0, date },
  ];
}

export async function demoFetchPayments(date: string): Promise<Payment[]> {
  // Fake data for the demo
  return [
    { id: "PAY-001", invoice_id: "INV-001", amount: 100.0, date },
    // Missing payment for INV-002 to create an unmatched example
  ];
}

export function matchInvoices(invoices: Invoice[], payments: Payment[]): ReconciliationResult {
  const invoicesById = new Map<string, Invoice>();
  const paymentsByInvoiceId = new Map<string, Payment>();

  for (const inv of invoices) invoicesById.set(inv.id, inv);
  for (const pay of payments) paymentsByInvoiceId.set(pay.invoice_id, pay);

  const matched: { invoice: Invoice; payment: Payment }[] = [];
  const unmatched_invoices: Invoice[] = [];
  const unmatched_payments: Payment[] = [];

  for (const [invId, inv] of invoicesById.entries()) {
    const payment = paymentsByInvoiceId.get(invId);
    if (payment && Math.abs(payment.amount - inv.amount) < 0.01) {
      matched.push({ invoice: inv, payment });
    } else {
      unmatched_invoices.push(inv);
    }
  }

  for (const pay of payments) {
    if (!invoicesById.has(pay.invoice_id)) {
      unmatched_payments.push(pay);
    }
  }

  return {
    matched,
    unmatched_invoices,
    unmatched_payments,
    totals: {
      num_invoices: invoices.length,
      num_payments: payments.length,
      num_matched: matched.length,
      num_unmatched_invoices: unmatched_invoices.length,
      num_unmatched_payments: unmatched_payments.length,
    },
  };
}

export function buildTasksFromRecon(recon: ReconciliationResult): Task[] {
  const tasks: Task[] = [];
  let idx = 1;

  for (const inv of recon.unmatched_invoices) {
    tasks.push({
      id: `T_INV_${idx++}`,
      kind: "invoice",
      ref_id: inv.id,
      description: `Investigate unmatched invoice ${inv.id} for ${inv.customer} (${inv.amount.toFixed(
        2
      )}).`,
      suggested_owner: "finance",
      priority: "medium",
    });
  }

  for (const pay of recon.unmatched_payments) {
    tasks.push({
      id: `T_PAY_${idx++}`,
      kind: "payment",
      ref_id: pay.id,
      description: `Investigate unmatched payment ${pay.id} for invoice ${pay.invoice_id} (${pay.amount.toFixed(
        2
      )}).`,
      suggested_owner: "ops",
      priority: "high",
    });
  }

  return tasks;
}

