# Mailbag loop handoff (2026-10-20, morning)

**Submitted 2026-10-18:** build 202610181800 on iOS and Mac, listing renamed Mailbag, new screenshots and review notes, short reply to Apple on both threads. Last recorded state: both WAITING_FOR_REVIEW. The 2.1(a) rejection came from the reviewed build calling a retired API host, so every sign-in and the demo inbox failed. The code now points at the jaybulb.com host.

## What the loop is

Keep every inbox on Joshua's Mac at zero with the app itself, add Outlook, then submit one Mailbag build to the App Store.

## Where things stand

- Inboxes: iCloud is at zero (action items filed into `Mailbag/Dev`). Gmail was cleared on the web on 2026-10-20: 1 filed, 2 archived, nothing deleted. Gmail through Mail.app bounces back after a sync, so do not call a Gmail inbox clean until it has survived one.
- Landing: rebuilt 2026-10-20 and live at mailbag.jaybulb.com in the Hermes style, with Greek halftone art, Mailbag Sans and Mailbag Display fonts, a glyph footer, a restyled privacy page and a new og image. Accent is clrs.cc blue (#0074D9, deep #004C8F, dark mode navy #001f3f). The brand kit (`brand/tokens.css`, `brand/BRAND.md`) and every icon are blue. Playwright QA passed.
- App Store: the build in review still has the old pink icon. The blue icon ships with the next store build.
- The Mac app is installed at `/Applications/Mailbag.app` (Debug build, Mail.app mode). Each Gmail account needs its own Gmail sign-in in the window: Ja and Gmail are both still waiting for one.
- Sorter: people are never filed or sent to the model, debt and legal notices are never filed, Junk needs scam signs. See "Who may be filed" in CLAUDE.md.
- Misfiled mail: the TSI collections notice is back in the Ja inbox at Joshua's request. Gmail still shows the old `Mailbag/Junk` label on it, which Mail.app cannot remove without risking Trash. Nothing was deleted.
- Outlook: parked. Joshua only has a school Microsoft account (langleyschools.ca), and that directory does not let users register apps. It needs a personal Microsoft account with its own directory. `az` is still logged in to the school tenant: do not register anything there.

## Next, in order

1. Gmail sign-in in the Mac app: Joshua clicks it once for each Gmail account (Ja and Gmail). If an account still reads "Sign in to Gmail" after a click, treat it as a bug in `Session.addGmail`/`saveGmail`. Do not launch the app in front of him to check. Ask him, or read the Keychain after he has used it: `security find-generic-password -s com.nulljosh.sieve -a gmail`.
2. Add `https://mailbag.jaybulb.com/auth/callback` in GCP Web client 1 (Chrome account jatrommel@gmail.com), then move `GOOGLE_REDIRECT` and `apiBase` to the mailbag host. Then submit the app for Google OAuth verification to lift the "unverified app" warning and the 100-user cap.
3. Outlook waits for a personal Microsoft account with its own directory. Then `az login`, register the Entra app, make a secret, `wrangler secret put` both values, deploy, test on a real mailbox. After that, add "Continue with Outlook" to the native sign-in.
4. Retake iPhone, iPad and Mac screenshots with `-demo YES`.
5. Next store build: carries the blue icon and the listing name flip. Check disk (about 6 GB free for the archives), archive iOS and macOS, upload, then cancel the old review, set the listing name to Mailbag and submit, all in one move.

## Restart prompt

```
/loop until every inbox on this Mac clears from the Mailbag window, Outlook works on a real mailbox, and the Mailbag build is submitted
```
