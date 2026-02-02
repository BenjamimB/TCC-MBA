# Project Structure

## Organization Philosophy

To be defined during the Design phase. The project will likely follow a modular organization aligned with the core domains:

- **Schedule** — Availability, appointments, calendar sync
- **WhatsApp/AI** — Message processing, intent detection, automated responses
- **Patients (CRM)** — Registration, history, waitlist
- **Auth** — Login, OAuth2, 2FA
- **Billing** — Subscriptions, payments, invoices

## Naming Conventions

_To be defined after stack selection._

## Import Organization

_To be defined after stack selection._

## Code Organization Principles

- Domain-driven separation of concerns
- Clear boundaries between external integrations (WhatsApp, Calendar, Payment) and core business logic

---
_Document patterns, not file trees. New files following patterns shouldn't require updates_
