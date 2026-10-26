# Mailbag roadmap

> Priority tier 1 (2026-10-17): live blocker, work first. Order: live blockers, ship pushes, active features, portfolio, exploratory. See docs/LOOP-HANDOFF.md.

## Blocked on Joshua
- Outlook needs a personal Microsoft account with its own directory. The school account cannot register apps. See docs/LOOP-HANDOFF.md.

## Ingested 2026-10-16
- [ ] Waiting on Apple for the iOS and macOS builds submitted 2026-10-18 as Mailbag (build 202610181800). Check the result in Resolution Center if either is rejected.

## Ingested 2026-10-25
- [ ] Add custom support for more mail providers, Telus etcetera (note title was "Mailbox", assumed Mailbag).
  - Needs scoping, not started 2026-10-26. `worker.js` runs on Cloudflare Workers and only speaks Gmail OAuth and Outlook Graph (Outlook still unregistered). Telus and most small hosts are plain IMAP with a password, which a Worker cannot reach without raw TCP sockets and stored app passwords. Mac Mail.app mode (`ios/App/MacMail.swift`, Debug only) already reads any provider. Decide: ship Mail.app mode in the store build, or build an IMAP bridge. Provider list and whether to store passwords is Joshua's call.
