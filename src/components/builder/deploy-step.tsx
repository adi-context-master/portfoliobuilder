"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Download,
  Globe,
  Loader2,
  ArrowLeft,
  ExternalLink,
  Copy,
  Check,
  KeyRound,
} from "lucide-react";
import { toast } from "sonner";

interface DeployStepProps {
  html: string;
  onBack: () => void;
}

export function DeployStep({ html, onBack }: DeployStepProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [netlifyToken, setNetlifyToken] = useState("");
  const [siteName, setSiteName] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedUrl, setDeployedUrl] = useState("");
  const [deployError, setDeployError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleDownloadZip() {
    setIsDownloading(true);
    try {
      const response = await fetch("/api/download-zip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate ZIP file");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "portfolio.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("ZIP file downloaded successfully!");
    } catch {
      toast.error("Failed to download ZIP file. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  }

  async function handleDeploy(e: React.FormEvent) {
    e.preventDefault();

    if (!netlifyToken.trim()) {
      toast.error("Please enter your Netlify personal access token.");
      return;
    }

    setIsDeploying(true);
    setDeployError("");
    setDeployedUrl("");

    try {
      const response = await fetch("/api/deploy-netlify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          html,
          token: netlifyToken.trim(),
          siteName: siteName.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Deployment failed");
      }

      setDeployedUrl(data.url);
      toast.success("Portfolio deployed successfully!");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Deployment failed. Please try again.";
      setDeployError(message);
      toast.error(message);
    } finally {
      setIsDeploying(false);
    }
  }

  async function handleCopyUrl() {
    try {
      await navigator.clipboard.writeText(deployedUrl);
      setCopied(true);
      toast.success("URL copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy URL.");
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Deploy Your Portfolio</h2>
        <p className="text-muted-foreground">
          Download the source files or deploy directly to Netlify with one click.
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Download ZIP Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2.5">
                <Download className="size-5 text-primary" />
              </div>
              <div>
                <CardTitle>Download ZIP</CardTitle>
                <CardDescription>Get the source files to host anywhere</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Download a ZIP archive containing your portfolio&apos;s HTML, CSS, and assets. You
              can host it on any static hosting provider like GitHub Pages, Vercel, or your own
              server.
            </p>
            <Button
              onClick={handleDownloadZip}
              disabled={isDownloading}
              className="w-full"
              size="lg"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Preparing download...
                </>
              ) : (
                <>
                  <Download className="size-4" />
                  Download ZIP
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Deploy to Netlify Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2.5">
                <Globe className="size-5 text-primary" />
              </div>
              <div>
                <CardTitle>Deploy to Netlify</CardTitle>
                <CardDescription>Go live in seconds with a free Netlify site</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {deployedUrl ? (
              /* Success state */
              <div className="space-y-4">
                <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="size-4 text-green-600 dark:text-green-400" />
                    <p className="text-sm font-medium text-green-800 dark:text-green-300">
                      Deployed successfully!
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={deployedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-green-700 dark:text-green-400 underline underline-offset-2 hover:text-green-900 dark:hover:text-green-200 truncate flex-1"
                    >
                      {deployedUrl}
                    </a>
                    <Button
                      variant="outline"
                      size="icon-xs"
                      onClick={handleCopyUrl}
                      title="Copy URL"
                    >
                      {copied ? (
                        <Check className="size-3 text-green-600" />
                      ) : (
                        <Copy className="size-3" />
                      )}
                    </Button>
                    <Button variant="outline" size="icon-xs" asChild title="Open in new tab">
                      <a href={deployedUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="size-3" />
                      </a>
                    </Button>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setDeployedUrl("");
                    setDeployError("");
                  }}
                >
                  Deploy Again
                </Button>
              </div>
            ) : (
              /* Deploy form */
              <form onSubmit={handleDeploy} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="netlify-token">
                    <KeyRound className="size-3.5" />
                    Personal Access Token
                  </Label>
                  <Input
                    id="netlify-token"
                    type="password"
                    placeholder="nfp_xxxxxxxxxxxxxxxxxxxx"
                    value={netlifyToken}
                    onChange={(e) => setNetlifyToken(e.target.value)}
                    disabled={isDeploying}
                  />
                  <p className="text-xs text-muted-foreground">
                    Create a token at{" "}
                    <a
                      href="https://app.netlify.com/user/applications#personal-access-tokens"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline underline-offset-2 hover:text-primary/80"
                    >
                      app.netlify.com
                      <ExternalLink className="inline size-3 ml-0.5 -mt-0.5" />
                    </a>
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="site-name">Site Name (optional)</Label>
                  <Input
                    id="site-name"
                    type="text"
                    placeholder="my-portfolio"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    disabled={isDeploying}
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave blank for an auto-generated name. Your site will be at{" "}
                    <span className="font-mono">
                      {siteName.trim() || "your-site"}.netlify.app
                    </span>
                  </p>
                </div>

                {/* Error message */}
                {deployError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-950/30">
                    <p className="text-sm text-red-700 dark:text-red-400">{deployError}</p>
                  </div>
                )}

                {/* Security note */}
                <div className="rounded-lg border bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <KeyRound className="inline size-3 mr-1 -mt-0.5" />
                    Your token is used only for this deployment and is <strong>never stored</strong>{" "}
                    on our servers. It is sent directly to the Netlify API over HTTPS.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isDeploying || !netlifyToken.trim()}
                  className="w-full"
                  size="lg"
                >
                  {isDeploying ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Deploying...
                    </>
                  ) : (
                    <>
                      <Globe className="size-4" />
                      Deploy to Netlify
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-start pt-2">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="size-4" />
          Back
        </Button>
      </div>
    </div>
  );
}
