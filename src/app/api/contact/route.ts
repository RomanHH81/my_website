import { NextResponse } from "next/server";

// Payload-Shape (muss zu src/components/sections/Contact/Contact.tsx passen
// und zu n8n/workflows/lead-handling.json).
type ContactPayload = {
  name: string;
  email: string;
  interest: string; // automation | web | design | infra | other
  message: string;
};

// Minimale Validierung — die ausführliche Datenkontrolle (Spam-Schutz,
// Rate-Limiting, Recaptcha) gehört in einen späteren Schritt. Hier
// nur "ist da ein Body, hat er die erwarteten Felder, sehen die Strings
// nach echten Werten aus?" Sonst lassen wir n8n die harte Arbeit machen.
function isValidPayload(value: unknown): value is ContactPayload {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  if (typeof v.name !== "string" || v.name.trim().length < 2) return false;
  if (typeof v.email !== "string" || !/.+@.+\..+/.test(v.email)) return false;
  if (typeof v.interest !== "string" || v.interest.length === 0) return false;
  if (typeof v.message !== "string" || v.message.trim().length < 5) return false;
  return true;
}

export async function POST(request: Request) {
  // 1. Body parsen
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Body ist kein gültiges JSON" },
      { status: 400 },
    );
  }

  // 2. Validieren
  if (!isValidPayload(body)) {
    return NextResponse.json(
      { error: "Pflichtfelder fehlen oder sind ungültig" },
      { status: 422 },
    );
  }

  // 3. Webhook-URL vorhanden?
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    // In Dev ohne gesetzte Env-Var: still loggen statt 500. So blockieren
    // wir das Formular nicht, falls jemand die Website ohne n8n testet.
    console.warn(
      "[contact] N8N_WEBHOOK_URL nicht gesetzt — Lead nur geloggt, nicht weitergeleitet.",
      body,
    );
    return NextResponse.json({ message: "Logged (no webhook configured)" });
  }

  // 4. An n8n weiterleiten. Wir geben n8n 8 Sekunden, dann brechen wir ab
  //    (n8n-Workflows starten mit Webhook + Postgres-Insert + 2 Mails — das
  //    sollte in <2s passen, 8s ist großzügig und schützt vor hängenden
  //    SMTP-Verbindungen).
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const n8nRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // Reihenfolge/Label passen zu n8n/workflows/lead-handling.json
        name: body.name.trim(),
        email: body.email.trim(),
        interest: body.interest,
        message: body.message.trim(),
        // Meta — nützlich für die DB-Zeile und für Forensik
        source: "primaflow.de",
        submittedAt: new Date().toISOString(),
        userAgent: request.headers.get("user-agent") ?? null,
        referer: request.headers.get("referer") ?? null,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!n8nRes.ok) {
      const detail = await n8nRes.text().catch(() => "");
      console.error(
        `[contact] n8n antwortete mit ${n8nRes.status}: ${detail.slice(0, 300)}`,
      );
      return NextResponse.json(
        { error: "Lead-Service momentan nicht erreichbar" },
        { status: 502 },
      );
    }

    return NextResponse.json({ message: "Lead weitergeleitet" });
  } catch (err) {
    clearTimeout(timeoutId);
    const isAbort = err instanceof Error && err.name === "AbortError";
    console.error(
      `[contact] n8n-Call fehlgeschlagen${isAbort ? " (Timeout 8s)" : ""}:`,
      err instanceof Error ? err.message : err,
    );
    return NextResponse.json(
      { error: isAbort ? "Lead-Service Timeout" : "Lead-Service Fehler" },
      { status: 502 },
    );
  }
}

// GET ist nicht erlaubt — wer die Route aus dem Browser aufruft, soll
// nicht unsere Logs zumüllen.
export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
