"use client";

import { useState } from "react";
import Link from "next/link";

export default function LandingPage() {

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-16">
      {/* HERO */}
      <section className="flex flex-col md:flex-row md:items-center gap-10" id="product">
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs tracking-wide uppercase">
            <div className="w-3 h-3 bg-specwerkRed rounded flex-shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 flex flex-col justify-center items-start px-0.5 space-y-0.5">
                <div className="w-full h-0.5 bg-white" />
                <div className="w-4/5 h-0.5 bg-white" />
                <div className="w-3/5 h-0.5 bg-white" />
              </div>
            </div>
            <span>Spec-first AI automation runtime</span>
          </div>
          <p className="text-xs text-black/60 max-w-xl">
            Think of SpecWerk as an OS for AI coworkers: they read specs, call tools, and leave an audit trail.
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Spec-first AI workflows for real work.
          </h1>
          <p className="text-sm md:text-base text-black/70 max-w-xl">
            Replace manual back-office work with spec-driven automations your engineers trust and your execs can approve.
          </p>
          <p className="text-xs text-black/60 italic">
            No five-LLM trench coat. Just specs, tools, and a thin agent layer.
          </p>
          <p className="text-xs text-black/70 font-medium max-w-xl">
            Built for teams who want AI employees they can <em>audit</em>, not AI &apos;agents&apos; they have to <em>believe</em>.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/studio"
              className="inline-flex items-center justify-center px-4 py-2 bg-specwerkRed text-white text-sm font-medium tracking-wide uppercase hover:bg-black transition"
            >
              Launch Studio →
            </Link>
            <Link
              href="/docs/01-overview"
              className="inline-flex items-center justify-center px-4 py-2 border border-black/20 bg-white text-sm font-medium tracking-wide uppercase hover:border-specwerkRed transition"
            >
              Read the spec
            </Link>
            <a
              href="https://github.com/funwae/specwerk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium tracking-wide uppercase text-black/70 hover:text-specwerkRed"
            >
              View on GitHub
            </a>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-full max-w-sm aspect-[4/3] bg-white border border-black/20 shadow-sm overflow-hidden">
            {/* Simple "diagram" tile */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 text-[10px] uppercase tracking-wide">
              <div className="border-r border-b border-black/10 flex flex-col items-center justify-center">
                <div className="w-8 h-8 bg-specwerkRed rounded mb-1 relative overflow-hidden">
                  <div className="absolute inset-0 flex flex-col justify-center items-start px-2 space-y-1">
                    <div className="w-full h-0.5 bg-white" />
                    <div className="w-4/5 h-0.5 bg-white" />
                    <div className="w-3/5 h-0.5 bg-white" />
                  </div>
                </div>
                <span>Specs</span>
                <span className="text-[9px] text-black/50">YAML SOPs</span>
              </div>
              <div className="border-b border-black/10 flex flex-col items-center justify-center">
                <div className="w-8 h-8 border border-black/40 mb-1" />
                <span>Tools</span>
                <span className="text-[9px] text-black/50">MCP or internal services</span>
              </div>
              <div className="border-r border-black/10 flex flex-col items-center justify-center">
                <div className="w-8 h-8 border border-black/40 mb-1 rounded-full" />
                <span>Runtime</span>
                <span className="text-[9px] text-black/50">deterministic, logged</span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-8 h-8 border border-black/40 mb-1 bg-black/90 text-white flex items-center justify-center">
                  <span className="text-[9px]">AI</span>
                </div>
                <span>Agent</span>
                <span className="text-[9px] text-black/50">thin judgment + language</span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/90 text-[10px] text-white px-3 py-2 flex items-center justify-between">
              <span>SpecWerk Circuit 01</span>
              <span className="text-white/60">WORKFLOW • TOOL • AGENT</span>
            </div>
          </div>
        </div>
      </section>

      {/* JOBS, SPECS, TOOLS, WORKER */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Jobs, Specs, Tools, Worker</h2>
        <p className="text-sm text-black/80 max-w-2xl mb-4">
          SpecWerk is an OS for AI workers. You don&apos;t wire up agents; you hire jobs by writing specs.
        </p>
        <div className="grid md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white border border-black/10 p-4 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-specwerkBlack">
              Job
            </div>
            <p className="text-black/80">
              The promise: &quot;Reconcile yesterday&apos;s invoices every morning at 9am and email finance a summary.&quot;
            </p>
          </div>
          <div className="bg-white border border-black/10 p-4 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-specwerkBlack">
              Spec
            </div>
            <p className="text-black/80">
              The contract for that job: inputs, steps, tools, outputs, checks. A YAML file your team can read and review.
            </p>
          </div>
          <div className="bg-white border border-black/10 p-4 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-specwerkBlack">
              Tools
            </div>
            <p className="text-black/80">
              Deterministic services (internal or MCP) the job is allowed to use. They do the actual work.
            </p>
          </div>
          <div className="bg-white border border-black/10 p-4 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-specwerkBlack">
              Worker
            </div>
            <p className="text-black/80">
              SpecWerk runtime + LLM that executes the spec and narrates what happened. One worker, no agent telephone game.
            </p>
          </div>
        </div>
      </section>

      {/* WHY SECTION */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">AI agents that behave like software, not improv actors.</h2>
        <p className="text-sm text-black/80 max-w-2xl">
          SpecWerk is an open-source runtime for AI workflows that behave like well-structured software, not ad-hoc chat logs.
        </p>
        <ul className="text-sm text-black/80 space-y-1 list-disc list-inside max-w-2xl">
          <li>Hire jobs by writing specs, not wiring up agents.</li>
          <li>Describe workflows in simple, human-readable specs.</li>
          <li>Run work through deterministic tools and MCP servers.</li>
          <li>Use a small agent step only where judgment or language is needed.</li>
          <li>Inspect every run in SpecWerk Studio's Kraftwerk-style control panel.</li>
        </ul>
        <p className="text-sm text-black/80 max-w-2xl">
          Result: AI that can replace parts of a team without turning into a black-box transcript.
        </p>

        <h3 className="text-lg font-semibold mt-8">Why SpecWerk?</h3>
        <p className="text-xs text-black/60 mb-4">Where it sits between agent frameworks and classic automation.</p>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white border border-black/10 p-4 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-black/60">
              Most Agent Frameworks
            </div>
            <ul className="space-y-1 list-disc list-inside text-black/80">
              <li>Conversation-first, multi-agent role-play</li>
              <li>Logic buried in prompts and chat logs</li>
              <li>Hard to replay or audit</li>
            </ul>
          </div>
          <div className="bg-white border border-black/10 p-4 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-black/60">
              Classic Automation
            </div>
            <ul className="space-y-1 list-disc list-inside text-black/80">
              <li>Deterministic but rigid scripts</li>
              <li>All glue code written by hand</li>
              <li>Slow to adapt to new workflows</li>
            </ul>
          </div>
          <div className="bg-white border border-black/10 p-4 space-y-2 border-specwerkRed">
            <div className="text-xs font-semibold uppercase tracking-wide text-specwerkRed">
              SpecWerk
            </div>
            <ul className="space-y-1 list-disc list-inside text-black/80">
              <li>Job-spec OS: hire jobs by writing specs</li>
              <li>Single worker, no agent-to-agent chat</li>
              <li>Spec-first, human-readable workflows</li>
              <li>Thin agents for judgment and language only</li>
              <li>Deterministic tools via MCP or internal code</li>
              <li>Studio UI for runs, logs, and debugging</li>
            </ul>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="space-y-4">
        <h2 className="text-xl font-semibold">How it works</h2>
        <div className="grid md:grid-cols-4 gap-4 text-sm">
          {[
            {
              title: "1. Define a job",
              body: "Hire a job by writing a spec: describe the promise, then the workflow as ordered steps in a YAML file your team can read.",
            },
            {
              title: "2. Build tools",
              body: "Implement tools as deterministic services, or let Tool Forge scaffold MCP servers and tests from a tool spec.",
            },
            {
              title: "3. Run with the runtime",
              body: "SpecWerk executes the spec deterministically, calling tools and agents exactly as defined.",
            },
            {
              title: "4. Observe in Studio",
              body: "Review runs, logs, and summaries in SpecWerk Studio's clean, Kraftwerk-inspired UI.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-black/10 p-4">
              <div className="text-xs uppercase tracking-wide text-black/60 mb-1">
                {item.title}
              </div>
              <p className="text-black/80">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section id="who" className="space-y-4">
        <h2 className="text-xl font-semibold">Who it&apos;s for</h2>
        <p className="text-sm text-black/70 max-w-2xl mb-4">
          Everyone else is racing to build more agents, more canvases, more connectors. SpecWerk is for the teams who <em>already know</em> what job they want done, and just want it done the same way every day, with a clear spec and a log.
        </p>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white border border-black/10 p-4">
            <div className="text-xs uppercase tracking-wide text-black/60 mb-1">
              Ops & Finance leaders
            </div>
            <ul className="text-sm text-black/80 space-y-1 list-disc list-inside">
              <li>Hire AI workers for recurring jobs: reconciliation, approvals, reporting.</li>
              <li>Keep a clear, auditable trail for every run.</li>
            </ul>
          </div>
          <div className="bg-white border border-black/10 p-4">
            <div className="text-xs uppercase tracking-wide text-black/60 mb-1">
              Platform & infra teams
            </div>
            <ul className="text-sm text-black/80 space-y-1 list-disc list-inside">
              <li>Offer a safe job-spec OS as a platform primitive.</li>
              <li>Standardize on specs, tools, and logs instead of ad-hoc &quot;AI experiments.&quot;</li>
            </ul>
          </div>
          <div className="bg-white border border-black/10 p-4">
            <div className="text-xs uppercase tracking-wide text-black/60 mb-1">
              Senior engineers & tooling devs
            </div>
            <ul className="text-sm text-black/80 space-y-1 list-disc list-inside">
              <li>Upgrade scripts and bots into job-driven automations.</li>
              <li>Version specs, tools, and run logs alongside your code.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* GET STARTED */}
      <section className="space-y-3" id="start">
        <h2 className="text-xl font-semibold">Get started</h2>
        <ol className="list-decimal list-inside text-sm space-y-1 text-black/80">
          <li>Read the overview</li>
          <li>Run the sample workflow</li>
          <li>Swap in your own tools</li>
        </ol>
        <pre className="mt-3 text-xs bg-black text-white p-3 rounded overflow-x-auto">
{`pip install specwerk

specwerk run specs/invoice-recon.yaml -p '{"date":"2025-01-01"}'`}
        </pre>
      </section>
    </div>
  );
}

