import { NextRequest, NextResponse } from "next/server";
import { parse as parseYAML } from "yaml";
import { SpecSchema, runSpec } from "@/lib/specRunner";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const specText = String(body.specText ?? "");
    const inputs = (body.inputs ?? {}) as Record<string, string>;

    if (!specText.trim()) {
      return NextResponse.json({ ok: false, error: "specText is required" }, { status: 400 });
    }

    // Parse YAML or JSON
    let raw: any;
    try {
      raw = specText.trim().startsWith("{") ? JSON.parse(specText) : parseYAML(specText);
    } catch (e: any) {
      return NextResponse.json(
        { ok: false, error: "Failed to parse spec as YAML/JSON: " + e.message },
        { status: 400 }
      );
    }

    const spec = SpecSchema.parse(raw);

    // Validate output step exists
    if (!spec.steps.some((s) => s.id === spec.output.step)) {
      return NextResponse.json(
        { ok: false, error: `Output step '${spec.output.step}' not found in steps.` },
        { status: 400 }
      );
    }

    const outputs = await runSpec(spec, inputs);

    return NextResponse.json({
      ok: true,
      spec,
      run: {
        steps: outputs,
      },
    });
  } catch (err: any) {
    console.error("run-spec error:", err);
    if (err.name === "ZodError") {
      return NextResponse.json(
        { ok: false, error: "Spec validation failed: " + err.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Internal server error" },
      { status: 500 }
    );
  }
}

