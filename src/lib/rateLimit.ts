// Minimaler In-Memory Rate-Limiter fuer einzelne API-Routen.
// Kein Redis-Backend wie bei handwerker_ki_saas, weil dieses Projekt
// nur einen Container ohne geteilten State braucht. Reicht, um simple
// Bot-Floods (z. B. 1000 Submits in wenigen Sekunden) abzufangen.

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

// Alle 10 Minuten alte Buckets raeumen, damit die Map nicht waechst.
setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}, 10 * 60 * 1000);

/**
 * Fixed-Window Rate-Limit. Gibt true zurueck, wenn die Anfrage erlaubt ist.
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (bucket.count >= limit) return false;

  bucket.count += 1;
  return true;
}

/**
 * Client-IP aus den ueblichen Proxy-Headern extrahieren.
 * x-real-ip zuerst (Traefik/Nginx setzen das meist direkt),
 * sonst der letzte Eintrag in x-forwarded-for (der naechste Hop
 * zum eigenen Reverse-Proxy, nicht vom Client faelschbar).
 */
export function getClientIp(request: Request): string {
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;

  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const parts = forwardedFor.split(",").map((p) => p.trim());
    return parts[parts.length - 1] || "unknown";
  }

  return "unknown";
}
