# Deploying to GitHub Pages

This repo is already set up for **GitHub Pages → Deploy from branch `main` → `/ (root)`**.
The built site (`index.html` + `static/`) lives at the repo root.

---

## Step 1 — Create the GitHub repo

1. Go to **https://github.com/new**
2. Name it (e.g. `vishesh-veeraja-wedding`)
3. Keep it **empty** (no README / .gitignore / license) — we already have those.
4. Click **Create repository** and copy the HTTPS URL, e.g.
   `https://github.com/YOUR_USERNAME/vishesh-veeraja-wedding.git`

## Step 2 — Push this project

Open a terminal at the project root (the folder that contains `index.html`, `frontend/`, `backend/`) and run:

```bash
git init
git add .
git commit -m "Initial commit — Vishesh & Veeraja wedding site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

If prompted for a password, use a **Personal Access Token** (GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token → scope: `repo`).

## Step 3 — Enable GitHub Pages

1. Go to your repo on GitHub → **Settings** tab.
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment → Source**, select **Deploy from a branch**.
4. Under **Branch**, choose **`main`** and folder **`/ (root)`**.
5. Click **Save**.

GitHub will publish your site at:

```
https://YOUR_USERNAME.github.io/YOUR_REPO/
```

It usually takes 30–90 seconds for the first deploy.

---

## How routing works on GitHub Pages

This app uses **HashRouter**, so your URLs look like:

- `https://YOUR_USERNAME.github.io/YOUR_REPO/#/`          (envelope + landing)
- `https://YOUR_USERNAME.github.io/YOUR_REPO/#/groom`     (groom's page)
- `https://YOUR_USERNAME.github.io/YOUR_REPO/#/bride`     (bride's page)
- `https://YOUR_USERNAME.github.io/YOUR_REPO/#/thank-you` (thank you page)

Hash routing is required because GitHub Pages is a static host and doesn't do SPA rewrites.
All deep links, refreshes, and back-button presses work correctly.

---

## Making changes later

1. Edit source files inside `/frontend/src/` (components, pages, events data…).
2. Rebuild and copy the new bundle to the repo root:

```bash
bash scripts/build-for-pages.sh
```

3. Commit and push:

```bash
git add .
git commit -m "Update <describe your change>"
git push
```

GitHub Pages will redeploy automatically. Hard-refresh your browser (`Cmd/Ctrl + Shift + R`) to bypass cache.

---

## About RSVPs

The site is designed to **work as a pure static site on GitHub Pages**. When a guest taps **Attend**, an `.ics` calendar file is generated in their browser and downloaded. When they tap **Not Attending**, they're sent to a thank-you page.

If you want to **persist RSVPs to a database** (see who responded), you need the optional FastAPI + MongoDB backend in `/backend/`. Host it somewhere like Railway / Render / Fly.io and set the frontend env var:

```bash
# frontend/.env
REACT_APP_BACKEND_URL=https://your-backend.example.com
```

Then rebuild and redeploy. If the backend is unreachable, the UI still works — RSVP posts fail silently while the calendar download and page redirect still happen.

---

## Custom domain (optional)

1. In **Settings → Pages → Custom domain**, enter e.g. `wedding.yourdomain.com`.
2. Add a `CNAME` DNS record pointing to `YOUR_USERNAME.github.io`.
3. GitHub will auto-provision HTTPS within an hour.
