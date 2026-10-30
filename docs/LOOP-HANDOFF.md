# Mailbag loop handoff (2026-10-30, 11:34)

## What the loop is

QA Mailbag on the landing (mailbag.jaybulb.com), the iPhone app and the Mac app with screenshots until each one reads A+, then ship the next store build carrying the new glass icon and fonts.

## Where things stand

- Store: the iOS and Mac builds submitted 2026-10-18 (build 202610181800) are in Apple review as Mailbag, last checked. The store still shows the old pink icon. Nothing new is submitted; the next build carries everything below.
- Icon: a Liquid Glass Icon Composer bundle (commit 5064b1d). A white letter slides into a pale glass mail sack, wired into the app target as `APPICON_NAME Mailbag`. The briefcase icon is gone. The flat web icon, the mark and the favicons are redrawn from the same shapes and deployed.
- Mascot: the sack, awake, drawn from the same shapes, above the closing call to action on the landing.
- Fonts: Mailbag Sans and Mailbag Display are Inter 4's text cut (opsz 14) and display cut (opsz 32), renamed by `scripts/gen_font.py` and set like SF: sentence case, bold, tight tracking, proportional figures. They run in the iPhone and Mac apps too, not only the site.
- Landing: matches Hermes 1:1 in design. The hero headline is the tagline "Inbox zero, one button". The demo inbox animates for signed-out visitors: a sample inbox sorts itself into folders on a loop.
- Fixed: Connect Outlook no longer shows on the site while Outlook is off.
- Inboxes: iCloud was cleared through Mail.app (3 filed, 3 archived). Both Gmail accounts are now signed in: the second one connected past Google's unverified-app screen and filed 2 more. Inbox zero on every account, nothing deleted.
- Mac app: Joshua's copy is the Debug build at `/Applications/Mailbag.app`, in Mail.app mode. No Mac app screenshot exists yet: the scratch build was unsigned, so it was not launched.
- Outlook: parked. Joshua's school Microsoft account cannot register apps, and `az` is logged in to that tenant, so register nothing with it. It needs a personal Microsoft account with its own directory.
- Google OAuth: the Mailbag callback is not yet in GCP Web client 1, and the app is not submitted for verification.

## Next, in order

1. QA the landing with screenshots at phone and desktop width. Check the 16px side gutter, no horizontal scroll, the demo inbox loop, the sack mascot placement and that Connect Outlook stays hidden. Fix anything under A+ and re-shoot.
2. QA the iPhone app in the simulator and the Mac app from a signed scratch build, one instance at a time, trap-killing after each shot. Check the glass icon at every size. Read the screens against the Hermes bar before calling them A+.
3. Retake the README and store screenshots with `-demo YES`, showing the glass icon.
4. Next store build carries the glass icon and the Inter-based fonts: check disk first (about 6 GB free for the archives), archive iOS and macOS, upload, and submit. Do not cancel the review in progress without Joshua's yes.
5. Google OAuth: add `https://mailbag.jaybulb.com/auth/callback` in GCP Web client 1, move `GOOGLE_REDIRECT` and `apiBase` to the mailbag host, then submit for verification to lift the unverified-app warning and the 100-user cap.
6. Outlook waits for a personal Microsoft account with its own directory. Then `az login`, register the Entra app, make a secret, `wrangler secret put` both values, deploy, and test on a real mailbox.

## Restart prompt

```
/loop QA Mailbag (landing, iPhone and Mac apps) with screenshots until A+, then ship the next store build with the new icon and fonts
```
