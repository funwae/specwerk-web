import { z } from "zod";
import { demoFetchInvoices, demoFetchPayments, matchInvoices } from "@/lib/demoWorkflow";
import { deepseek } from "@/lib/deepseek";

export const InputFieldSchema = z.object({
  name: z.string(),
  label: z.string(),
  type: z.enum(["text", "date", "number"]).default("text"),
  required: z.boolean().optional(),
});

export const StepSchema = z.object({
  id: z.string(),
  type: z.enum(["tool", "agent"]),
  tool: z.string().optional(),
  params: z.record(z.string(), z.any()).optional(),
  prompt: z.string().optional(),
});

export const SpecSchema = z.object({
  version: z.literal("0.1"),
  name: z.string(),
  description: z.string(),
  input: z
    .object({
      fields: z.array(InputFieldSchema),
    })
    .optional(),
  steps: z.array(StepSchema).min(1),
  output: z.object({
    step: z.string(),
  }),
});

export type Spec = z.infer<typeof SpecSchema>;
export type Step = z.infer<typeof StepSchema>;
export type InputField = z.infer<typeof InputFieldSchema>;

function resolveParams(
  params: Record<string, any> | undefined,
  inputs: Record<string, string>
): Record<string, any> {
  const out: Record<string, any> = {};
  for (const [key, value] of Object.entries(params ?? {})) {
    if (typeof value === "string" && value.startsWith("$inputs.")) {
      const fieldName = value.slice("$inputs.".length);
      out[key] = inputs[fieldName];
    } else {
      out[key] = value;
    }
  }
  return out;
}

function resolvePrompt(
  prompt: string,
  stepOutputs: Record<string, any>,
  inputs: Record<string, string>
): string {
  let resolved = prompt;
  // Replace {{ inputs.field }}
  resolved = resolved.replace(/{{\s*inputs\.([a-zA-Z0-9_]+)\s*}}/g, (_, name) => {
    return inputs[name] ?? "";
  });
  // Replace {{ steps.stepId }}
  resolved = resolved.replace(/{{\s*steps\.([a-zA-Z0-9_]+)\s*}}/g, (_, id) => {
    return JSON.stringify(stepOutputs[id] ?? {}, null, 2);
  });
  // Replace {{ steps.stepId.field }} for direct field access
  resolved = resolved.replace(/{{\s*steps\.([a-zA-Z0-9_]+)\.([a-zA-Z0-9_]+)\s*}}/g, (_, id, field) => {
    const stepOutput = stepOutputs[id];
    if (stepOutput && typeof stepOutput === "object" && field in stepOutput) {
      return String(stepOutput[field]);
    }
    return "";
  });
  return resolved;
}

export async function runSpec(spec: Spec, inputs: Record<string, string>) {
  const stepOutputs: Record<string, any> = {};

  for (const step of spec.steps) {
    if (step.type === "tool") {
      if (!step.tool) throw new Error(`Tool step ${step.id} missing 'tool'`);

      // Tool allowlist for safety
      if (!step.tool.startsWith("demo.")) {
        throw new Error(`Tool ${step.tool} is not allowed in the demo. Only demo.* tools are allowed.`);
      }

      const params = resolveParams(step.params ?? {}, inputs);
      let output: any;

      switch (step.tool) {
        case "demo.fetch_invoices":
          output = { invoices: await demoFetchInvoices(params.date ?? "") };
          break;
        case "demo.fetch_payments":
          output = { payments: await demoFetchPayments(params.date ?? "") };
          break;
        case "demo.match_invoices":
          output = matchInvoices(
            stepOutputs["fetch_invoices"]?.invoices ?? [],
            stepOutputs["fetch_payments"]?.payments ?? []
          );
          break;
        default:
          throw new Error(`Tool ${step.tool} is not allowed in the demo.`);
      }

      stepOutputs[step.id] = output;
    } else if (step.type === "agent") {
      if (!step.prompt) throw new Error(`Agent step ${step.id} missing 'prompt'`);

      const resolvedPrompt = resolvePrompt(step.prompt, stepOutputs, inputs);

      const completion = await deepseek.chat.completions.create({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "You are a helpful, concise workflow assistant." },
          { role: "user", content: resolvedPrompt },
        ],
        stream: false,
      }) as any;

      const text = completion.choices[0].message.content ?? "";
      stepOutputs[step.id] = { text };
    } else {
      throw new Error(`Unknown step type for ${step.id}`);
    }
  }

  return stepOutputs;
}

