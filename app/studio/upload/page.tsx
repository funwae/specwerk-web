"use client";

import { useState } from "react";
import type { InputField } from "@/lib/specRunner";

type ParsedSpec = {
  name: string;
  description: string;
  input?: { fields: InputField[] };
  steps: { id: string; type: string; tool?: string }[];
  output: { step: string };
};

export default function StudioUploadPage() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [specText, setSpecText] = useState<string | null>(null);
  const [parsed, setParsed] = useState<ParsedSpec | null>(null);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = String(ev.target?.result ?? "");
      setSpecText(text);
      setResult(null);
      setError(null);
      setParsed(null);
    };
    reader.readAsText(file);
  };

  const runSpec = async () => {
    if (!specText) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/studio/run-spec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ specText, inputs }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error ?? "Unknown error");
      } else {
        setParsed(json.spec);
        setResult(json.run);
      }
    } catch (e: any) {
      setError(e?.message ?? "Request failed");
    } finally {
      setLoading(false);
    }
  };

  const fields: InputField[] = parsed?.input?.fields ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">SpecWerk Studio – Upload Demo</h1>
        <p className="text-sm text-black/70 max-w-xl">
          Upload a small SpecWerk demo spec file (<code className="text-xs bg-black/10 px-1">.yaml</code> or <code className="text-xs bg-black/10 px-1">.json</code>), fill in the inputs, and watch the workflow run—tools first, then a DeepSeek-powered agent summary.
        </p>
        <div className="flex gap-3 pt-2">
          <a
            href="/specs/invoice-recon-demo.yaml"
            download="invoice-recon-demo.yaml"
            className="text-xs text-specwerkRed hover:text-black uppercase tracking-wide"
          >
            Download Example Spec →
          </a>
        </div>
      </header>

      <section className="space-y-3">
        <div className="flex flex-wrap items-center gap-4">
          <input
            type="file"
            accept=".yaml,.yml,.json"
            onChange={onFileChange}
            className="text-sm"
          />
          {fileName && (
            <span className="text-xs text-black/60">
              Selected: <span className="font-mono">{fileName}</span>
            </span>
          )}
        </div>
        {specText && !parsed && (
          <p className="text-xs text-black/60">
            Spec ready. Click &quot;Run workflow&quot; to parse & validate it.
          </p>
        )}
      </section>

      {parsed && (
        <section className="space-y-3">
          <div>
            <h2 className="text-lg font-semibold">Workflow: {parsed.name}</h2>
            <p className="text-sm text-black/70">{parsed.description}</p>
          </div>

          {fields.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Inputs</h3>
              <div className="grid md:grid-cols-3 gap-3">
                {fields.map((field) => (
                  <div key={field.name} className="text-sm">
                    <label className="block text-xs uppercase tracking-wide text-black/60 mb-1">
                      {field.label}
                    </label>
                    <input
                      type={field.type === "number" ? "number" : field.type}
                      value={inputs[field.name] ?? ""}
                      onChange={(e) =>
                        setInputs((prev) => ({
                          ...prev,
                          [field.name]: e.target.value,
                        }))
                      }
                      className="border border-black/20 bg-white px-2 py-1 text-sm w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      <section className="space-y-3">
        <button
          onClick={runSpec}
          disabled={!specText || loading}
          className="px-4 py-2 bg-specwerkRed text-white text-xs font-semibold uppercase tracking-wide hover:bg-black transition disabled:opacity-50"
        >
          {loading ? "Running..." : "Run workflow"}
        </button>

        {error && (
          <div className="border border-red-400 bg-red-50 text-sm text-red-700 p-3">
            Error: {error}
          </div>
        )}
      </section>

      {result && parsed && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Execution trace</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            {parsed.steps.map((step) => (
              <div key={step.id} className="bg-white border border-black/10 p-3">
                <div className="text-xs uppercase tracking-wide text-black/60 flex justify-between">
                  <span>{step.id}</span>
                  <span>{step.type}</span>
                </div>
                <pre className="mt-2 text-[11px] bg-black/90 text-white p-2 overflow-x-auto rounded">
                  {JSON.stringify(result.steps?.[step.id] ?? {}, null, 2)}
                </pre>
              </div>
            ))}
          </div>

          <div className="bg-white border border-black/10 p-3">
            <div className="text-xs uppercase tracking-wide text-black/60 mb-1">
              Output · {parsed.output.step}
            </div>
            {parsed.output.step === "summarize" && result.steps?.[parsed.output.step]?.text ? (
              <p className="text-sm text-black/80 whitespace-pre-line">
                {result.steps[parsed.output.step].text}
              </p>
            ) : (
              <pre className="text-[11px] bg-black/90 text-white p-2 overflow-x-auto rounded">
                {JSON.stringify(result.steps?.[parsed.output.step] ?? {}, null, 2)}
              </pre>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

