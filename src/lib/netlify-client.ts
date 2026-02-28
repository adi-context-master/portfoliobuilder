import { createPortfolioZip } from "./zip-builder";

interface CreateSiteResponse {
  id: string;
  name: string;
  url: string;
  ssl_url: string;
  admin_url: string;
}

interface DeployResponse {
  id: string;
  site_id: string;
  state: string;
  url: string;
  ssl_url: string;
}

export async function deployToNetlify(
  token: string,
  htmlContent: string,
  siteName?: string
): Promise<{ url: string; siteId: string }> {
  // Step 1: Create a new site
  const siteBody: Record<string, unknown> = {};
  if (siteName) {
    siteBody.name = siteName.toLowerCase().replace(/[^a-z0-9-]/g, "-");
  }

  const siteRes = await fetch("https://api.netlify.com/api/v1/sites", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(siteBody),
  });

  if (!siteRes.ok) {
    const err = await siteRes.text();
    throw new Error(`Failed to create Netlify site: ${err}`);
  }

  const site: CreateSiteResponse = await siteRes.json();

  // Step 2: Deploy the ZIP
  const zipBuffer = await createPortfolioZip(htmlContent);

  const deployRes = await fetch(
    `https://api.netlify.com/api/v1/sites/${site.id}/deploys`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/zip",
      },
      body: new Uint8Array(zipBuffer),
    }
  );

  if (!deployRes.ok) {
    const err = await deployRes.text();
    throw new Error(`Failed to deploy to Netlify: ${err}`);
  }

  const deploy: DeployResponse = await deployRes.json();

  return {
    url: deploy.ssl_url || deploy.url || site.ssl_url || site.url,
    siteId: site.id,
  };
}
