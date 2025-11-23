import fs from "node:fs/promises";
import path from "node:path";
import ReactMarkdown from "react-markdown";
import { Card, CardBody } from "../../components/ui/Card";

async function getOverviewMarkdown() {
  const filePath = path.join(process.cwd(), "docs", "01-overview.md");
  const content = await fs.readFile(filePath, "utf8");
  return content;
}

export default async function DocsOverviewPage() {
  const content = await getOverviewMarkdown();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-6">
      <Card>
        <CardBody>
          <article
            className="
              prose prose-sm max-w-none
              prose-headings:font-display
              prose-headings:text-specwerkBlack
              prose-headings:font-medium
              prose-p:text-black/80
              prose-p:leading-relaxed
              prose-strong:text-specwerkBlack
              prose-strong:font-semibold
              prose-ul:text-black/80
              prose-ol:text-black/80
              prose-li:text-black/80
              prose-blockquote:border-l-specwerkRed
              prose-blockquote:border-l-4
              prose-blockquote:pl-4
              prose-blockquote:italic
              prose-blockquote:text-black/70
              prose-code:font-mono
              prose-code:text-sm
              prose-code:bg-black/5
              prose-code:px-1
              prose-code:py-0.5
              prose-code:rounded
              prose-pre:bg-black
              prose-pre:text-white
              prose-pre:p-4
              prose-pre:rounded
              prose-pre:overflow-x-auto
              prose-a:text-specwerkRed
              prose-a:no-underline
              hover:prose-a:underline
            "
          >
            <ReactMarkdown>{content}</ReactMarkdown>
          </article>
        </CardBody>
      </Card>
    </div>
  );
}

