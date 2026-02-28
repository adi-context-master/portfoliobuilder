"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: 1,
    title: "Pick a Theme",
    description:
      "Choose from 6 professionally designed portfolio themes.",
  },
  {
    number: 2,
    title: "Upload Your Resume",
    description:
      "Upload a PDF or paste your resume text. AI does the rest.",
  },
  {
    number: 3,
    title: "Deploy & Share",
    description:
      "Get a live URL in seconds, or download your portfolio as a ZIP.",
  },
] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function HowItWorks() {
  return (
    <section className="border-t bg-muted/40 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center text-3xl font-bold tracking-tight sm:text-4xl"
        >
          How It Works
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="mx-auto mt-4 max-w-xl text-center text-muted-foreground"
        >
          Three simple steps to your professional portfolio.
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-10 sm:grid-cols-3"
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="flex flex-col items-center text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                {step.number}
              </div>
              <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
