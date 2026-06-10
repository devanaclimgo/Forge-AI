export function extractProjectName(content: string) {
  const productNameMatch = content.match(/Product Name:\s*(.+)/i);

  if (productNameMatch?.[1]) {
    return productNameMatch[1].trim();
  }

  const firstLine = content.split("\n")[0].trim();

  return firstLine.length > 50
    ? `${firstLine.slice(0, 50)}...`
    : firstLine || "New Project";
}