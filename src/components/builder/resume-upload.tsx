"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { ResumeData } from "@/types/resume";

interface ResumeUploadProps {
  onParsed: (data: ResumeData, rawText: string) => void;
  onBack: () => void;
}

export function ResumeUpload({ onParsed, onBack }: ResumeUploadProps) {
  const [activeTab, setActiveTab] = useState<string>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState("");
  const [isParsing, setIsParsing] = useState(false);

  const { getRootProps, getInputProps, isDragActive, isDragAccept } =
    useDropzone({
      accept: { "application/pdf": [".pdf"] },
      maxFiles: 1,
      onDrop: (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
          setFile(acceptedFiles[0]);
        }
      },
      onDropRejected: () => {
        toast.error("Only PDF files are accepted.");
      },
    });

  const canParse =
    (activeTab === "upload" && file !== null) ||
    (activeTab === "paste" && pastedText.trim().length > 0);

  async function handleParse() {
    if (!canParse) return;

    setIsParsing(true);

    try {
      const formData = new FormData();

      if (activeTab === "upload" && file) {
        formData.append("file", file);
      } else {
        formData.append("text", pastedText);
      }

      const response = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(
          errorBody?.error || `Failed to parse resume (${response.status})`
        );
      }

      const result = await response.json();
      const data: ResumeData = result.data;
      const rawText: string = result.rawText ?? pastedText;

      onParsed(data, rawText);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to parse resume."
      );
    } finally {
      setIsParsing(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Upload Your Resume
        </h2>
        <p className="mt-2 text-muted-foreground">
          Upload a PDF or paste your resume text so AI can extract your
          information.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      >
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value);
          }}
          className="w-full"
        >
          <TabsList className="w-full">
            <TabsTrigger value="upload" className="flex-1">
              <Upload className="mr-1.5 size-4" />
              Upload PDF
            </TabsTrigger>
            <TabsTrigger value="paste" className="flex-1">
              <FileText className="mr-1.5 size-4" />
              Paste Text
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="upload" key="upload" asChild>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="mt-6"
              >
                <div
                  {...getRootProps()}
                  className={`
                    group relative flex min-h-[260px] cursor-pointer flex-col items-center justify-center
                    rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200
                    ${
                      isDragActive && isDragAccept
                        ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                        : isDragActive
                          ? "border-destructive bg-destructive/5"
                          : file
                            ? "border-primary/50 bg-primary/5"
                            : "border-muted-foreground/25 bg-muted/30 hover:border-primary/50 hover:bg-muted/50"
                    }
                  `}
                >
                  <input {...getInputProps()} />

                  <div
                    className={`
                      mb-4 flex size-16 items-center justify-center rounded-full transition-colors duration-200
                      ${
                        isDragActive && isDragAccept
                          ? "bg-primary/15 text-primary"
                          : file
                            ? "bg-primary/15 text-primary"
                            : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                      }
                    `}
                  >
                    {file ? (
                      <FileText className="size-8" />
                    ) : (
                      <Upload className="size-8" />
                    )}
                  </div>

                  {file ? (
                    <>
                      <p className="text-base font-medium">{file.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB — Click or drop to
                        replace
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-base font-medium">
                        {isDragActive
                          ? "Drop your resume here..."
                          : "Drag & drop your resume PDF here, or click to browse"}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Only .pdf files are accepted
                      </p>
                    </>
                  )}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="paste" key="paste" asChild>
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="mt-6"
              >
                <Textarea
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  placeholder={`Paste your resume text here...\n\nFor example:\n\nJohn Doe\nSoftware Engineer\njohn@example.com\n\nExperience:\n- Senior Developer at Acme Corp (2021–Present)\n  Built and maintained microservices...\n\nEducation:\n- B.S. Computer Science, MIT (2017–2021)\n\nSkills: React, TypeScript, Node.js, Python`}
                  className="min-h-[260px] resize-y text-sm leading-relaxed"
                />
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        className="flex items-center justify-between"
      >
        <Button variant="ghost" onClick={onBack} disabled={isParsing}>
          <ArrowLeft className="mr-2 size-4" />
          Back
        </Button>

        <Button onClick={handleParse} disabled={!canParse || isParsing}>
          {isParsing ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Parsing with AI...
            </>
          ) : (
            "Parse Resume"
          )}
        </Button>
      </motion.div>
    </div>
  );
}
