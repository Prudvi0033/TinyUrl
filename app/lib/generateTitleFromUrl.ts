export function generateTitleFromUrl(url: string): string {
  try {
    const { hostname } = new URL(url);

    const cleaned = hostname
      .replace(/^www\./, "")
      .replace(/\.com|\.in|\.net|\.org|\.io/g, "");

    const parts = cleaned.split(/[.\-]/).filter(Boolean);

    const title = parts
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return title || "Untitled Link";
  } catch {
    return "Untitled Link";
  }
}
