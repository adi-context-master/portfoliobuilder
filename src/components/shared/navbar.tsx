"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Sparkles className="h-5 w-5 text-primary" />
          PortfolioBuilder
        </Link>
        <Link
          href="/builder"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Build My Portfolio
        </Link>
      </div>
    </nav>
  );
}
