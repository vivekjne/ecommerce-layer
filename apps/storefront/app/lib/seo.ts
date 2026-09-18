export const SITE_NAME = "Acme Shop";
export const SITE_DESCRIPTION =
  "Gear for the trail and the everyday — browse the catalog yourself, or ask the shopping assistant to find it for you.";

/** Resolves a path to an absolute URL using the incoming request's own origin (works in dev, preview, and prod without a hardcoded env var). */
export function absoluteUrl(request: Request, path: string): string {
  return new URL(path, new URL(request.url).origin).toString();
}

export function pageTitle(title?: string): string {
  return title ? `${title} — ${SITE_NAME}` : SITE_NAME;
}
