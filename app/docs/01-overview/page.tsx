import fs from "node:fs/promises";
import path from "node:path";
import ReactMarkdown from "react-markdown";
import { Card, CardBody } from "../../components/ui/Card";

async function getOverviewMarkdown() {
  const filePath = path.join(process.cwd(), "docs", "01-overview.md");
  const content = await fs.readFile(filePath, "utf8");
  return content;
}

export default async function OverviewPage() {
  const content = await getOverviewMarkdown();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-6">
      <article className="prose prose-sm max-w-none prose-headings:font-display prose-headings:font-medium prose-headings:text-specwerkBlack prose-p:text-black/80 prose-p:leading-relaxed prose-strong:text-specwerkBlack prose-strong:font-semibold prose-ul:text-black/80 prose-ol:text-black/80 prose-li:text-black/80 prose-blockquote:border-l-specwerkRed prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-black/70 prose-code:text-sm prose-code:bg-black/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-black prose-pre:text-white prose-pre:p-4 prose-pre:rounded prose-pre:overflow-x-auto">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </div>
  );
}

