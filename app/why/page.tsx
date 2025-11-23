import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { Pill } from "../components/ui/Pill";

export default function WhySpecWerkPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <section className="space-y-3">
        <h1 className="font-display text-3xl md:text-4xl leading-tight font-medium">
          Where SpecWerk Fits in the Agentic AI Landscape
        </h1>
        <p className="text-sm text-black/75 max-w-2xl">
          SpecWerk is a spec-first workflow OS that sits on top of tools and MCP. It uses a deliberately thin layer of agentic behavior instead of multi-agent role-play.
        </p>
      </section>

      <section>
        <Card>
          <CardHeader
            title="Mental model comparison"
            subtitle="How SpecWerk thinks differently about AI work."
          />
          <CardBody>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-black/10">
                    <th className="py-2 pr-4 font-semibold text-black/80"></th>
                    <th className="py-2 px-4 font-semibold text-black/80">Most Agent Frameworks</th>
                    <th className="py-2 pl-4 font-semibold text-specwerkBlack">SpecWerk</th>
                  </tr>
                </thead>
                <tbody className="text-black/80">
                  <tr className="border-b border-black/5">
                    <td className="py-3 pr-4 font-medium">Primary artifact</td>
                    <td className="py-3 px-4">Code & prompts</td>
                    <td className="py-3 pl-4 font-medium">Job & workflow specs</td>
                  </tr>
                  <tr className="border-b border-black/5">
                    <td className="py-3 pr-4 font-medium">Agent behavior</td>
                    <td className="py-3 px-4">Multi-agent conversations</td>
                    <td className="py-3 pl-4 font-medium">Single worker, no agent-to-agent chat</td>
                  </tr>
                  <tr className="border-b border-black/5">
                    <td className="py-3 pr-4 font-medium">Side effects</td>
                    <td className="py-3 px-4">Agents often call tools directly</td>
                    <td className="py-3 pl-4 font-medium">Only deterministic tools do side effects</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium">Story for execs</td>
                    <td className="py-3 px-4">&quot;Trust us, the agents talked it out&quot;</td>
                    <td className="py-3 pl-4 font-medium">&quot;Here&apos;s the spec, here&apos;s the log.&quot;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader
            title="The short version"
            subtitle="How SpecWerk compares to popular agent frameworks."
          />
          <CardBody>
            <ul className="list-disc pl-4 space-y-2 text-sm text-black/80">
              <li>
                <span className="font-semibold">Similar:</span> runs multi-step workflows with tools, can call MCP servers, and uses LLMs in the loop.
              </li>
              <li>
                <span className="font-semibold">Different:</span> the spec file is the contract, not a Python module or a visual canvas. Agents don&apos;t talk to each other; they add a single layer of reasoning and narrative.
              </li>
              <li>
                <span className="font-semibold">Who it&apos;s for:</span> teams that want an auditable, spec-driven control room for AI workflows, not a general-purpose agent playground.
              </li>
            </ul>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Design stance" />
          <CardBody className="space-y-2 text-sm">
            <div className="flex flex-wrap gap-2 mb-3">
              <Pill>Spec-first</Pill>
              <Pill>Tool-first</Pill>
              <Pill>Anti-telephone-game</Pill>
            </div>
            <p className="text-black/75">
              Specs are contracts. Tools do the work. Agents narrate and glue
              the pieces together, but they are not "little employees" chatting
              in the dark.
            </p>
          </CardBody>
        </Card>
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader
            title="What others already do well"
            subtitle="We don't try to replace these."
          />
          <CardBody>
            <ul className="list-disc pl-4 space-y-2 text-sm text-black/80">
              <li>
                <span className="font-semibold">Agent frameworks:</span>{" "}
                LangChain, LangGraph, AutoGen, CrewAI and others are excellent
                for building custom agent logic in Python/TypeScript.
              </li>
              <li>
                <span className="font-semibold">Visual builders:</span>{" "}
                tools like LangFlow, Flowise and Dify make it easy to wire up
                node-based flows and experiment quickly.
              </li>
              <li>
                <span className="font-semibold">Vendor platforms:</span>{" "}
                OpenAI, Azure and others provide hosted agents, dashboards and
                evaluation for large-scale deployments.
              </li>
            </ul>
          </CardBody>
        </Card>
        <Card>
          <CardHeader
            title="What SpecWerk focuses on instead"
            subtitle="The narrow slice we care about."
          />
          <CardBody>
            <ul className="list-disc pl-4 space-y-2 text-sm text-black/80">
              <li>
                Workflow specs that ops, finance, and engineering can all read
                and review.
              </li>
              <li>
                Deterministic tools (internal or MCP) as the primary way work
                gets done.
              </li>
              <li>
                A Studio UI that shows each step&apos;s inputs, outputs and
                agent summary in one place.
              </li>
            </ul>
          </CardBody>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader
            title="Where MCP fits"
            subtitle="MCP as plumbing, not ideology."
          />
          <CardBody className="space-y-3 text-sm text-black/80">
            <p>
              MCP is <strong>plumbing</strong>: a clean way to expose databases, ERPs, CRMs, etc. as tools.
            </p>
            <p>
              SpecWerk is <strong>above</strong> that: jobs & workflows that <em>happen</em> to call MCP tools when needed.
            </p>
            <p>You can:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Use MCP where it saves time</li>
              <li>Use direct internal code where it&apos;s easier</li>
              <li>Mix both in a single spec</li>
            </ul>
            <p className="pt-2 text-black/70 italic">
              We don&apos;t compete with MCP. We treat it like a socket – plug in whatever you want; the job spec is the thing that matters.
            </p>
          </CardBody>
        </Card>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader
            title="What we're actually doing differently"
            subtitle="Four things that aren't just marketing copy."
          />
          <CardBody>
            <ol className="list-decimal pl-4 space-y-3 text-sm text-black/80">
              <li>
                <span className="font-semibold">The spec is the contract.</span>{" "}
                Your workflow lives as a YAML file that ops can read, finance can approve, and engineering can version. The runtime executes it; Studio visualizes it.
              </li>
              <li>
                <span className="font-semibold">Tools get forged once, then run deterministically.</span>{" "}
                Tool Forge uses AI to generate tool code and tests from a spec. After that, it's just code—reviewed, tested, and called like any other function.
              </li>
              <li>
                <span className="font-semibold">Agents don't talk to each other.</span>{" "}
                Each agent step has one job: take outputs from previous steps and produce a summary or decision. No recursive loops, no "let me ask my colleague" patterns.
              </li>
              <li>
                <span className="font-semibold">Studio is built for non-devs.</span>{" "}
                The UI shows what ran, what each step produced, and what the agent concluded—in terms that make sense to someone who doesn't write Python.
              </li>
            </ol>
          </CardBody>
        </Card>
        <Card>
          <CardHeader
            title="When SpecWerk is the wrong choice"
            subtitle="Honest fit check."
          />
          <CardBody className="space-y-2 text-sm">
            <ul className="list-disc pl-4 space-y-1 text-black/80">
              <li>
                You want open-ended, creative multi-agent simulations.
              </li>
              <li>
                You need a hosted, fully-managed platform with SLAs.
              </li>
              <li>
                You&apos;d rather build everything directly in LangChain,
                CrewAI, or Microsoft Agent Framework and own the UX yourself.
              </li>
            </ul>
            <p className="text-[11px] text-black/60 mt-2">
              SpecWerk is a small, opinionated slice of the stack. It&apos;s
              designed to play nicely with the rest—not replace it.
            </p>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}

