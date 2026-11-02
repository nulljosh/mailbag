# Mailbag Money

How Mailbag makes money. The company plan is `REVENUE.md` in the Code root; the ledger is `GTM.md`.

## Price and rail

Free on iPhone, iPad and Mac (ASC 6811141466), and free on the web. Nothing is charged, and nothing is locked behind a payment. There is no paid tier.

## What is actually sold

Nothing. Mailbag sorts mail the person already has, through their own sign-in. The risk is access, not price. Gmail's restricted scopes need Google's verification, and until then the app is unverified and capped at 100 users.

## Who pays and why

Nobody pays today. If anyone ever does, it is one dollar, once, under the rule. Heavy inbox users are the people who would care: they want Clear inbox to file the machine mail and leave the mail from people alone.

## Cost to serve

One paid service: Workers AI (Llama 3.3 70B) for Smart sorting. It is one batched call per Clear inbox, at most 30 leftover messages, and it fails open, so the rules still stand if the call fails. Only machine mail reaches the model; mail from people never does. The Settings switch and `?ai=0` turn it off. The code sets no daily cap. Gmail, Outlook and iCloud are read through their own APIs and IMAP. Hosting is Cloudflare.

## Where we are

- 2026-10-04: renamed from Hagaki to Mailbag. The store listing still says Hagaki until the Mailbag build ships with the new name (repo notes).
- Repo notes (undated): Google's OAuth app is unverified, with a 100-user cap.
- Revenue: no verified number (the App Store Connect key cannot read sales yet).

## Role in the company plan

Catalogue. GTM.md lists it as free. It serves no revenue stage directly. Under Stage 2 it either earns a place as a utility that comes with the machine or is retired.

## Next

Ship the Mailbag build and flip the store listing to Mailbag in the same submission, never one without the other.

## Million, billion, trillion

**A million.** Mailbag is a free inbox button, and the money comes from the apps beside it, not from it.

**A billion.** Mailbag is the mail tool built into every Jaybulb device, reading every provider a person uses.

**A trillion.** Mailbag is the inbox layer of a whole platform, with the mail still in each person's own account.

## Change it

`asc pricing schedule create --app 6811141466 --price 0.99 --base-territory USA --start-date YYYY-MM-DD` if it ever becomes paid, which is not planned. Only with Joshua's yes in chat.

Anyone who got Mailbag while it was free keeps it free.

*ASC 6811141466. Verified 2026-11-02.*
