# Automatisch-Shop — Starter Repo

Dieses Starter-Repo enthält ein minimales, aber produktionsnahes Grundgerüst
für einen hoch automatisierten Online-Store mit Next.js (Frontend) und
Node.js/Express (Backend). Es ist vorbereitet für Stripe (Checkout),
Printful (Fulfillment) und Klaviyo (E-Mail-Automation).

## Inhalt
- frontend/: Next.js Beispiel (Produktliste, Warenkorb, Checkout-Button)
- backend/: Express-API (Stripe Session + Webhook, Printful call skeleton)
- .env.example mit den benötigten Environment-Variablen

## Schnellstart (lokal)
1. `cd backend` → `npm install` → `npm run dev` (Port 4000)
2. `cd frontend` → `npm install` → `npm run dev` (Next.js dev)
3. .env-Datei anlegen (siehe `.env.example`) und Keys eintragen.

## Hinweise
- Für produktiven Betrieb API-Keys in sicheren Umgebungen (Secrets) speichern.
- Webhook-Endpoint absichern und Stripe Webhook-Secret verwenden.
- Dies ist ein Starter; passe Produktdaten, rechtliche Texte und Geschäftsbedingungen an.