export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  // Dynamic import to avoid pdf-parse trying to load test files at module level
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const pdfParse = require("pdf-parse/lib/pdf-parse");
  const data = await pdfParse(buffer);
  return data.text;
}
