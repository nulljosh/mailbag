# Mailbag roadmap

> Priority tier 1 (2026-10-17): live blocker, work first. Order: live blockers, ship pushes, active features, portfolio, exploratory. See docs/LOOP-HANDOFF.md.

## Blocked on Joshua
- Outlook needs a personal Microsoft account with its own directory. The school account cannot register apps. See docs/LOOP-HANDOFF.md.

## Ingested 2026-10-16
- [ ] Waiting on Apple for the iOS and macOS builds submitted 2026-10-18 as Mailbag (build 202610181800). Check the result in Resolution Center if either is rejected.

## Ingested 2026-10-25
- [ ] Submit the next Mac build with Mail.app mode: needs `asc web auth login` (throttled until 12:20Z). Put a justification for the `temporary-exception.apple-events` com.apple.mail entitlement in the review notes (it reads Mail inboxes, sends only sender and subject to /api/sort, files into Mailbag/ folders). Expect a possible entitlement push-back; fallback is a Direct download build.
