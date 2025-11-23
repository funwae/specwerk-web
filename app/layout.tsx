import "./globals.css";
import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "./components/Logo";

export const metadata = {
  title: "SpecWerk – Spec-first AI agents for real work",
  description: "Spec-first AI workflow runtime and studio.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-specwerkBg text-specwerkBlack">
        <header className="border-b border-black/10 bg-white">
          <div className="mx-auto max-w-6xl flex items-center justify-between py-3 px-4">
            <Link href="/" className="hover:opacity-80 transition">
              <Logo />
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-xs tracking-wide uppercase">
              <Link href="/#product" className="hover:text-specwerkRed">Product</Link>
              <Link href="/#how" className="hover:text-specwerkRed">How it works</Link>
              <Link href="/#who" className="hover:text-specwerkRed">Who it&apos;s for</Link>
              <Link href="/#start" className="hover:text-specwerkRed">Get started</Link>
              <Link href="/why" className="hover:text-specwerkRed">Why SpecWerk</Link>
              <Link href="/studio" className="hover:text-specwerkRed">Studio</Link>
            </nav>
          </div>
        </header>
        <main className="min-h-[calc(100vh-56px)]">
          {children}
        </main>
        <footer className="border-t border-black/10 text-xs text-black/60">
          <div className="mx-auto max-w-6xl py-4 px-4 flex justify-between items-center">
            <span>© {new Date().getFullYear()} SpecWerk.</span>
            <span className="hidden md:inline">
              Built for people who are done arguing with five LLMs in a trench coat.
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}

