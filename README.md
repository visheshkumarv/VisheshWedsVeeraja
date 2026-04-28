# Vishesh & Veeraja — A Royal Celebration

A fully responsive wedding invitation website for the wedding of
**Vishesh Kumar Vupputuri & Veeraja Rachamalla** on **May 8, 2026**.

Live: https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/ _(after you deploy)_

## Experience

1. **Envelope intro** — Tap the V&V wax seal to open the envelope.
2. **Landing** — Vupputuri family welcome, live countdown to May 8, 2026, "Let's Celebrate" button.
3. **Split screen** — Choose Groom (Vishesh Kumar) or Bride (Veeraja).
4. **Events** — Haldi, Mehendi, Pelli Koduku / Pelli Kuthuru, Marriage, Reception.
5. **RSVP** — Attend downloads an `.ics` calendar reminder; Not Attending navigates to a thank-you page.

## Tech Stack

- **Frontend**: React 19, Tailwind CSS, Framer Motion, React Router (hash), Sonner, Lucide icons.
- **Backend** (optional — only for persisting RSVPs): FastAPI + MongoDB. Not required for GitHub Pages — the UI gracefully works without it.

## Folder structure (at repo root)

```
/
├── index.html                  ← built site (served by GitHub Pages)
├── static/                     ← built JS + CSS bundles
├── asset-manifest.json
├── .nojekyll                   ← tells GitHub Pages to serve files as-is
│
├── frontend/                   ← React source
│   ├── src/
│   │   ├── App.js
│   │   ├── components/ (Envelope, SplitModal, EventCard, Countdown…)
│   │   ├── pages/ (Home, GroomPage, BridePage, ThankYou)
│   │   ├── data/events.js      ← all event dates/times/locations
│   │   └── lib/ics.js          ← calendar-file generator
│   └── package.json
│
├── backend/                    ← optional FastAPI backend for RSVPs
│   ├── server.py
│   └── requirements.txt
│
└── scripts/
    └── build-for-pages.sh      ← one-command rebuild & deploy-prep
```

## Publishing to GitHub Pages

See [DEPLOY.md](./DEPLOY.md) for the full step-by-step guide.

**TL;DR**

```bash
git init
git add .
git commit -m "Vishesh & Veeraja wedding site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Deploy from a branch → `main` / `/ (root)` → Save**.

## Updating the site

After editing anything in `/frontend/src/`:

```bash
bash scripts/build-for-pages.sh
git add .
git commit -m "update site"
git push
```

GitHub Pages will redeploy in ~1 minute.

---

Built with love for the Vupputuri family.
