import OpenAI from "openai";

let deepseekClient: OpenAI | null = null;

function getDeepseekClient(): OpenAI {
  if (!deepseekClient) {
    if (!process.env.DEEPSEEK_API_KEY) {
      throw new Error("DEEPSEEK_API_KEY is not set. Please set it in your environment variables.");
    }
    deepseekClient = new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseURL: "https://api.deepseek.com",
    });
  }
  return deepseekClient;
}

export const deepseek = {
  chat: {
    completions: {
      create: async (
        params: Parameters<OpenAI["chat"]["completions"]["create"]>[0]
      ): Promise<Awaited<ReturnType<OpenAI["chat"]["completions"]["create"]>>> => {
        return getDeepseekClient().chat.completions.create(params) as Promise<any>;
      },
    },
  },
};

export async function summarizeReconciliation(result: any): Promise<string> {
  const messages = [
    {
      role: "system" as const,
      content:
        "You are an accounting assistant. Summarize reconciliation results clearly and concisely for a finance team.",
    },
    {
      role: "user" as const,
      content:
        "Here is the reconciliation result JSON:\n\n" +
        JSON.stringify(result, null, 2) +
        "\n\nWrite a short summary under 150 words.",
    },
  ];

  const completion = await deepseek.chat.completions.create({
    model: "deepseek-chat",
    messages,
    stream: false,
  }) as any;

  return completion.choices[0].message.content ?? "";
}

export async function analyzeUnmatchedWithDeepseek(recon: any, date: string): Promise<string> {
  const completion = await deepseek.chat.completions.create({
    model: "deepseek-chat",
    messages: [
      {
        role: "system",
        content:
          "You are a finance operations analyst. Explain reconciliation issues clearly and briefly.",
      },
      {
        role: "user",
        content:
          `Date: ${date}\n\n` +
          `Here is the reconciliation result JSON:\n\n` +
          JSON.stringify(recon, null, 2) +
          `\n\nDescribe the key issues:\n- What kinds of mismatches exist?\n- What should the team pay attention to?\nKeep it under 160 words.`,
      },
    ],
    stream: false,
  }) as any;

  return completion.choices[0].message.content ?? "";
}

export async function summarizeRunForFinance(
  recon: any,
  tasks: any[],
  date: string
): Promise<string> {
  const completion = await deepseek.chat.completions.create({
    model: "deepseek-chat",
    messages: [
      {
        role: "system",
        content:
          "You are a concise finance lead. Summarize the daily AR run for other executives.",
      },
      {
        role: "user",
        content:
          `Date: ${date}\n\n` +
          `Reconciliation result:\n` +
          JSON.stringify(recon, null, 2) +
          `\n\nTask list:\n` +
          JSON.stringify(tasks, null, 2) +
          `\n\nWrite a short summary for finance and ops:\n- Overall status\n- Key issues\n- Next actions\nKeep it under 180 words.`,
      },
    ],
    stream: false,
  }) as any;

  return completion.choices[0].message.content ?? "";
}
