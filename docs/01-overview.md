# SpecWerk Overview

> Spec-first AI workflows for real work.
> Deterministic tools on rails, with a thin agent layer on top.

SpecWerk is an open-source, spec-first workflow engine and studio.

You describe workflows in simple specs, run them through deterministic tools (internal or MCP), and use a small agent layer to explain and surface decisions. SpecWerk Studio shows each run step-by-step so engineers and business owners can see what actually happened.

---

## Why SpecWerk exists

Most "AI agents" today either:

1. **Chat-first agents**
   - Multiple LLMs talk to each other in long conversations.
   - Logic lives in prompts and back-and-forth messages.
   - Runs are hard to audit or replay.

2. **Code-first orchestration**
   - Engineers wire up LangChain / LangGraph / custom flows.
   - The source of truth is Python/TypeScript and internal diagrams.
   - Non-technical teams can't easily see what the workflow does.

SpecWerk offers a third path:

> Specs as the contract. Tools as the workhorses. Agents as narrators, not coworkers.

- Workflows are described in portable specs that anyone on the team can read.
- Side-effects and external calls go through deterministic tools.
- LLMs can reason and summarize, but don't improvise the architecture.

---

## Core ideas

### 1. Spec-first workflows

The primary artifact in SpecWerk is the **workflow spec**, not a code module or UI diagram.

A workflow spec defines:

- **Inputs** — the data this workflow needs (for example `date`, `account_id`).
- **Steps** — an ordered list of actions:
  - `tool` steps call deterministic tools (internal functions or MCP tools).
  - `agent` steps call an LLM to interpret, summarize, or make a narrow decision.
- **Outputs** — which step(s) count as the official result.

Specs live in your repo (e.g. `specs/invoice-recon.yaml`), are reviewed in PRs, and versioned alongside code.

### 2. Tool-first execution

SpecWerk assumes that tools **do the work**.

External calls, database writes, API calls, and messages all go through tools:

- Internal Python functions.
- MCP servers for ERP, CRM, ticketing, storage, etc.

Tools are:

- Deterministic and testable in isolation.
- Described in tool specs (name, inputs, outputs, side effects).
- Reusable across workflows.

This makes it easier to answer:

- What can this workflow do?
- Which systems can it touch?
- What do we need to test before go-live?

Tool Forge (planned) lets you generate and refine tools with AI help once, then own them as normal code.

### 3. Agents as narrators, not coworkers

SpecWerk intentionally avoids "multi-agent telephone games."

Agent steps are **single, bounded calls**:

- They receive structured context (`inputs`, previous `steps`).
- They produce text or structured guidance, not raw side effects.

Agents typically:

- Summarize results ("what happened in this reconciliation?").
- Suggest decisions ("which items should we escalate?").
- Draft human-facing messages.

They do **not**:

- Call external systems.
- Spin up other agents.
- Modify the spec or architecture.

That boundary is the core of SpecWerk's reliability model.

### 4. Studio as a control room

SpecWerk Studio is the UI for workflows and runs.

For each run, Studio can show:

- **Run header** — inputs, spec version, model used, triggering user.
- **Step-by-step trace** — type (`tool` vs `agent`), tool name or prompt, arguments, outputs.
- **Agent summary panel** — a clear explanation in business language.

A VP of Ops should be able to open one screen and answer:

> "What did this workflow do today, and should I trust it?"

---

## High-level architecture

SpecWerk has four main pieces:

1. **Specs**
   - Workflow specs (`specs/*.yaml`).
   - Tool specs (`specs/tools/*.yaml`) for Tool Forge and documentation.

2. **Runtime (Python)**
   - Parses and validates workflow specs.
   - Executes steps in order.
   - Calls tools (internal functions, MCP tools) with typed inputs.
   - Calls LLMs (OpenAI / DeepSeek / others) through a thin agent client.
   - Writes structured run logs.

3. **Tools & MCP**
   - Internal tools defined as Python functions.
   - External tools exposed via MCP servers (ERP, CRM, ticketing, storage).
   - Tool Forge (future) to scaffold tool code and tests from specs.

4. **SpecWerk Studio (Next.js)**
   - Reads metadata and run logs via an HTTP API.
   - Lets you browse workflows, run them with parameters, and inspect runs.
   - Provides a safe demo environment for uploaded specs.

---

## Example: invoice reconciliation workflow

Example workflow:

> "Each morning, reconcile yesterday's invoices against payments, then summarize mismatches."

Conceptually, the spec defines:

1. **Inputs**
   - `date` (default "yesterday").

2. **Steps**
   - `fetch_invoices` (tool) — calls an ERP tool to fetch invoices.
   - `fetch_payments` (tool) — calls a bank tool to fetch payments.
   - `reconcile` (tool) — matches invoices and payments and computes totals.
   - `summarize` (agent) — takes the reconciliation result and produces a short summary for finance.

3. **Outputs**
   - The `summarize` step's text.
   - The structured reconciliation payload from `reconcile`.

In Studio, you see each step, its type, and payload, plus a summary explaining:

- How many invoices were processed.
- How many matched.
- Which need attention.

---

## What SpecWerk is (and isn't)

### SpecWerk is…

- A spec-first runtime and GUI for AI workflows.
- A way to make AI-driven processes explicit and auditable.
- A bridge between:
  - Ops and finance teams who need clarity.
  - Engineers who want deterministic behavior.
  - LLMs that add reasoning and narrative.

### SpecWerk is not…

- A general-purpose "agent playground" with dozens of chatty agents.
- A replacement for LangChain, CrewAI, Microsoft Agent Framework, or other dev libraries.
- A hosted SaaS automation platform. It's meant to be self-hosted or embedded.

In practice, you might:

- Use LangChain / CrewAI / Agent Framework inside tools for complex logic.
- Use OpenAI / DeepSeek / others as the underlying models.
- Use MCP to connect to external systems.

SpecWerk then becomes the orchestration and visibility layer on top.

---

## Who should care

SpecWerk is for teams that:

- Already have some automation (scripts, jobs, internal tools).
- Want to add AI for summarization and judgment.
- Need clear contracts and traceable behavior in production workflows.

Typical stakeholders:

- VP / Director of Operations.
- Finance and accounting leads.
- Platform / internal tools engineers.
- AI platform owners who want a single, understandable "control room" for workflows.

---

## Next steps

If you're evaluating SpecWerk:

1. Run the demo workflow in SpecWerk Studio.
2. Read the architecture docs for deeper detail.
3. Start from the demo spec, swap in your tools, and inspect the runs.
