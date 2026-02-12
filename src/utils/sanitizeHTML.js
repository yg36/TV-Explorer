import DOMPurify from "dompurify";

export function sanitizeHTML(html) {
  if (!html) return "No summary available.";
  return DOMPurify.sanitize(html);
}
