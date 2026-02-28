export interface NetlifyDeployRequest {
  token: string;
  siteName?: string;
  htmlContent: string;
}

export interface NetlifyDeployResponse {
  success: boolean;
  url?: string;
  siteId?: string;
  error?: string;
}

export interface NetlifySite {
  id: string;
  name: string;
  url: string;
  ssl_url: string;
  admin_url: string;
}

export interface NetlifyDeploy {
  id: string;
  site_id: string;
  state: string;
  url: string;
  ssl_url: string;
}
