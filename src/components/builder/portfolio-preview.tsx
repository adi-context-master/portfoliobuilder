"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Monitor,
  Tablet,
  Smartphone,
  RefreshCw,
  ArrowLeft,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PortfolioPreviewProps {
  html: string;
  isLoading: boolean;
  onGenerate: () => void;
  onContinue: () => void;
  onBack: () => void;
}

type DeviceType = "desktop" | "tablet" | "mobile";

const devices: { type: DeviceType; label: string; icon: typeof Monitor; width: string }[] = [
  { type: "desktop", label: "Desktop", icon: Monitor, width: "100%" },
  { type: "tablet", label: "Tablet", icon: Tablet, width: "768px" },
  { type: "mobile", label: "Mobile", icon: Smartphone, width: "375px" },
];

export function PortfolioPreview({
  html,
  isLoading,
  onGenerate,
  onContinue,
  onBack,
}: PortfolioPreviewProps) {
  const [activeDevice, setActiveDevice] = useState<DeviceType>("desktop");

  const currentDevice = devices.find((d) => d.type === activeDevice)!;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Preview Your Portfolio</h2>
        <p className="text-muted-foreground">
          See how your portfolio looks across different devices. Generate a preview to get started.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        {/* Device toggle */}
        <div className="flex items-center gap-1 rounded-lg border bg-muted/50 p-1">
          {devices.map((device) => {
            const Icon = device.icon;
            return (
              <button
                key={device.type}
                onClick={() => setActiveDevice(device.type)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all",
                  activeDevice === device.type
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="size-4" />
                <span className="hidden sm:inline">{device.label}</span>
              </button>
            );
          })}
        </div>

        {/* Regenerate button */}
        {html && !isLoading && (
          <Button variant="outline" size="sm" onClick={onGenerate}>
            <RefreshCw className="size-3.5" />
            Regenerate
          </Button>
        )}
      </div>

      {/* Preview area */}
      <div className="rounded-xl border bg-muted/30 p-4 sm:p-6">
        <div
          className="mx-auto transition-all duration-300 ease-in-out"
          style={{ maxWidth: currentDevice.width }}
        >
          {/* Device frame */}
          <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b bg-muted/60 px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <div className="size-3 rounded-full bg-red-400" />
                <div className="size-3 rounded-full bg-yellow-400" />
                <div className="size-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 mx-4">
                <div className="h-6 rounded-md bg-background border px-3 flex items-center">
                  <span className="text-xs text-muted-foreground truncate">
                    my-portfolio.dev
                  </span>
                </div>
              </div>
            </div>

            {/* Content area */}
            {isLoading ? (
              <div className="p-6 space-y-6" style={{ minHeight: "500px" }}>
                {/* Skeleton loading state */}
                <div className="space-y-4">
                  <Skeleton className="h-8 w-3/4 mx-auto" />
                  <Skeleton className="h-4 w-1/2 mx-auto" />
                </div>
                <div className="flex items-center justify-center pt-4">
                  <Loader2 className="size-6 animate-spin text-muted-foreground" />
                </div>
                <div className="space-y-3 pt-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/6" />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <Skeleton className="h-32 w-full rounded-lg" />
                  <Skeleton className="h-32 w-full rounded-lg" />
                </div>
                <div className="space-y-3 pt-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
                <p className="text-center text-sm text-muted-foreground pt-2">
                  Generating your portfolio...
                </p>
              </div>
            ) : html ? (
              <iframe
                srcDoc={html}
                title="Portfolio preview"
                className="w-full border-0"
                style={{ height: "600px" }}
                sandbox="allow-scripts"
              />
            ) : (
              <div
                className="flex flex-col items-center justify-center gap-4 p-12"
                style={{ minHeight: "500px" }}
              >
                <div className="rounded-full bg-muted p-4">
                  <Monitor className="size-8 text-muted-foreground" />
                </div>
                <div className="text-center space-y-1.5">
                  <h3 className="font-semibold text-lg">No preview yet</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Click the button below to generate a live preview of your portfolio based on
                    your information and selected theme.
                  </p>
                </div>
                <Button size="lg" onClick={onGenerate} className="mt-2">
                  Generate Preview
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="size-4" />
          Back
        </Button>
        <Button
          size="lg"
          disabled={!html || isLoading}
          onClick={onContinue}
          className="min-w-[180px]"
        >
          Continue to Deploy
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
