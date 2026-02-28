"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center px-4 py-24 text-center sm:py-32 md:py-40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-3xl"
      >
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Build Your Portfolio{" "}
          <span className="text-primary">in Minutes</span>
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
      >
        Pick a theme, upload your resume, and let AI craft a stunning portfolio
        site you can deploy instantly — no coding required.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className="mt-10 flex flex-col items-center gap-4"
      >
        <Button asChild size="lg" className="h-12 px-8 text-base">
          <Link href="/builder">
            Build My Portfolio — It&apos;s Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>

        <p className="text-sm text-muted-foreground">
          No sign-up required. 100% free.
        </p>
      </motion.div>
    </section>
  );
}
