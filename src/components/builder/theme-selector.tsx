"use client";

import { themes } from "@/templates";
import { ThemeId } from "@/types/theme";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ThemeSelectorProps {
  selectedTheme: ThemeId | null;
  onSelect: (theme: ThemeId) => void;
  onContinue: () => void;
}

export function ThemeSelector({
  selectedTheme,
  onSelect,
  onContinue,
}: ThemeSelectorProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Choose Your Theme
        </h2>
        <p className="text-muted-foreground">
          Select a visual style for your portfolio. You can always change it
          later.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {themes.map((theme) => {
          const isSelected = selectedTheme === theme.id;

          return (
            <motion.div
              key={theme.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                onClick={() => onSelect(theme.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(theme.id);
                  }
                }}
                className={`relative cursor-pointer transition-all duration-200 py-0 overflow-hidden ${
                  isSelected
                    ? "ring-2 ring-primary shadow-md"
                    : "hover:shadow-md border-border/60"
                }`}
              >
                {/* Selected badge */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="absolute top-3 right-3 z-10"
                  >
                    <Badge className="size-6 p-0 flex items-center justify-center rounded-full">
                      <Check className="size-3.5" />
                    </Badge>
                  </motion.div>
                )}

                {/* Color swatch preview area */}
                <div
                  className="relative h-24 w-full flex items-center justify-center gap-0"
                  style={{ backgroundColor: theme.colors.primary + "18" }}
                >
                  <div className="flex items-center -space-x-3">
                    {(
                      [
                        { color: theme.colors.primary, label: "Primary" },
                        { color: theme.colors.secondary, label: "Secondary" },
                        { color: theme.colors.accent, label: "Accent" },
                      ] as const
                    ).map((swatch, i) => (
                      <motion.div
                        key={swatch.label}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          delay: i * 0.08,
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        className="size-12 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: swatch.color, zIndex: 3 - i }}
                        title={swatch.label}
                      />
                    ))}
                  </div>
                </div>

                {/* Card body */}
                <CardContent className="py-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-base">{theme.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-snug">
                    {theme.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Continue button */}
      <div className="flex justify-end pt-2">
        <Button
          size="lg"
          disabled={!selectedTheme}
          onClick={onContinue}
          className="min-w-[140px]"
        >
          Continue
          <ArrowRight className="size-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
