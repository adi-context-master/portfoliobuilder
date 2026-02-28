import JSZip from "jszip";

export async function createPortfolioZip(htmlContent: string): Promise<Buffer> {
  const zip = new JSZip();
  zip.file("index.html", htmlContent);
  const buffer = await zip.generateAsync({
    type: "nodebuffer",
    compression: "DEFLATE",
  });
  return buffer;
}
