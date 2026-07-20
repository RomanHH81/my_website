# n8n-Workflows für primaflow.de

Workflows für die Lead-Automation des Kontaktformulars auf
[primaflow.de](https://primaflow.de). Läuft auf einem self-hosted
[n8n](https://n8n.io/) auf `n8n.primaflow.de` (Netcup-VPS Nürnberg).

## Enthaltene Workflows

| Datei | Zweck | Trigger |
|---|---|---|
| `lead-handling.json` | Speichert jeden Lead in Postgres, benachrichtigt primaflow intern, schickt dem Absender eine Auto-Reply-Mail | HTTP POST von primaflow.de `/api/contact` |

## 1. Postgres-Tabelle anlegen

Vor dem ersten Workflow-Start brauchst du die `leads`-Tabelle.
Das SQL-Schema ist simpel und n8n-agnostisch:

```sql
CREATE TABLE IF NOT EXISTS leads (
  id            BIGSERIAL PRIMARY KEY,
  name          TEXT        NOT NULL,
  email         TEXT        NOT NULL,
  interest      TEXT        NOT NULL,
  message       TEXT        NOT NULL,
  source        TEXT,
  submitted_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_agent    TEXT,
  referer       TEXT
);

CREATE INDEX IF NOT EXISTS idx_leads_submitted_at ON leads (submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email        ON leads (email);
```

Das kannst du direkt in deiner Postgres-Instanz ausführen — egal ob
self-hosted Postgres, Supabase, Neon oder Netcup-Container. n8n's
Postgres-Node spricht Standard-Postgres-Wire-Protocol, die Auth ist
per User/Password (kein OAuth nötig).

## 2. n8n-Credentials anlegen

Im n8n-UI unter **Settings → Credentials** zwei Einträge erstellen —
die Namen müssen **exakt** so lauten, weil das Workflow-JSON sie
über den Namen referenziert:

### `Primaflow Postgres`

- **Typ:** Postgres
- **Host:** `localhost` (wenn n8n + DB im selben Container) oder
  `db` / dein Container-Name (wenn beides im selben Docker-Network)
- **Database:** `primaflow`
- **User:** `n8n`
- **Password:** siehe `docker-compose.yml` / `.env`
- **Port:** `5432`
- **SSL:** aus (wenn beide im privaten Docker-Netz laufen)

### `Primaflow SMTP`

- **Typ:** SMTP
- **Host:** z. B. `smtp.resend.com` (Resend) ODER `smtp.mailbox.org`
  (DSGVO) ODER dein eigener Mailserver
- **Port:** `465` (SSL) oder `587` (STARTTLS)
- **User / Password:** wie vom Provider
- **SSL/TLS:** an
- **Sender-Default:** `noreply@primaflow.de` (muss beim Provider
  als verifizierte Absender-Adresse hinterlegt sein!)

> **Wichtig:** Das Workflow-JSON referenziert die Credentials über
> den Namen (`Primaflow Postgres` / `Primaflow SMTP`). Wenn du
> die Credentials anders benennst, öffne den importierten
> Workflow, klick auf den jeweiligen Node und wähle unten die
> richtige Credential aus.

## 3. Workflow importieren

1. n8n-UI → **Workflows** → oben rechts **„Import from File"**
2. `lead-handling.json` auswählen → importieren
3. **Active-Schalter rechts oben aktivieren** (sonst läuft der
   Webhook nicht!)
4. Die Webhook-URL steht jetzt unter dem Webhook-Node:
   `https://n8n.primaflow.de/webhook/primaflow-lead`
5. Diese URL als Env-Var in primaflow.de hinterlegen:

```bash
# .env.local (lokal) + in Vercel-Env-Vars (Production)
N8N_WEBHOOK_URL="https://n8n.primaflow.de/webhook/primaflow-lead"
```

## 4. Testlauf

Schnellster Sanity-Check ohne die Website zu bemühen — direkt curl
gegen den Webhook:

```bash
curl -X POST https://n8n.primaflow.de/webhook/primaflow-lead \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@beispiel.de",
    "interest": "web",
    "message": "Das ist ein Test-Lead aus dem README.",
    "source": "primaflow.de",
    "submittedAt": "2026-07-20T20:00:00.000Z",
    "userAgent": "curl/8.0",
    "referer": null
  }'
```

Wenn alles passt:
- Postgres `leads`-Tabelle enthält eine neue Zeile
- Du bekommst eine Mail an `info@primaflow.de`
- `test@beispiel.de` bekommt die Auto-Reply

## 5. Webhook absichern (TODO, Phase 2)

Aktuell ist der Webhook **offen** — wer die URL kennt, kann beliebige
Payloads reinschicken. Für die Demo-Phase OK, für Produktion solltest
du mindestens einen der folgenden Schritte ergänzen:

- **Shared Secret im Header:** API-Route und Webhook-Node einigen sich
  auf einen `X-Webhook-Secret`-Header, der per Env-Var in beiden
  Systemen gesetzt wird
- **IP-Whitelist im Reverse-Proxy:** n8n.primaflow.de ist nur per
  Vercel-IP-Range erreichbar (in Nginx Proxy Manager konfigurierbar)
- **Captcha im Formular:** hCaptcha oder Cloudflare Turnstile vor
  dem Submit einbauen (zusätzlicher Refactor am Form-Component)

## Architektur-Notiz

Die primaflow.de-Website ist **dumm** — sie weiß nicht, was n8n tut
oder wie der Lead verarbeitet wird. Sie schickt nur einen POST ab
und prüft, ob 200 zurückkommt. Alle Geschäftslogik (Spam-Filter,
Lead-Scoring, CRM-Sync, Follow-up-Sequenzen) gehört in n8n. So
bleibt die Website klein und du kannst den Workflow jederzeit
erweitern, ohne das Frontend anzufassen.
