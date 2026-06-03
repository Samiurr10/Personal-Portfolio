# Fix Vercel — deploy latest `main` (not `058e6a3`)

Your GitHub `main` branch has all updates (resume, samiur.dev, Copyright 2026).
If Vercel shows **Source: main · 058e6a3 · Initial commit**, production was never
redeployed from GitHub after that first deploy.

## Step 1: Connect GitHub to the project

1. Open [vercel.com/dashboard](https://vercel.com/dashboard)
2. Open **personal-portfolio** (or **personal-portfolio-nine-sand**)
3. **Settings** → **Git**
4. If it says **Not connected** or shows the wrong repo:
   - Click **Connect Git Repository**
   - Choose **GitHub** → authorize if asked
   - Select **`Samiurr10/Personal-Portfolio`**
5. Set **Production Branch** to **`main`**
6. Save

## Step 2: Deploy the latest commit

1. Go to **Deployments**
2. Click **Create Deployment** (top right)
3. Choose:
   - **Branch:** `main`
   - **Commit:** latest (`2125d0c` or newer)
4. Click **Deploy**
5. When status is **Ready**, click **⋯** → **Promote to Production** (if it isn’t already Production)

Or: open the latest `main` deployment → **⋯** → **Redeploy** → uncheck “Use existing Build Cache”.

## Step 3: Environment variables

**Settings** → **Environment Variables** → **Production**:

| Name | Value |
|------|--------|
| `REACT_APP_SITE_URL` | `https://samiur.dev` |
| `REACT_APP_CONTACT_EMAIL` | `srahman96@gatech.edu` |

**Ask Me Anything (optional, smarter answers):**

| Name | Value |
|------|--------|
| `OPENAI_API_KEY` | Your OpenAI API key |

Without `OPENAI_API_KEY`, the chat still works using built-in answers about your background.

**Save** → redeploy once more.

## Step 4: Domains

**Settings** → **Domains** — confirm:

- `samiur.dev` → Production
- `www.samiur.dev` → Production

## Step 5: Verify

After deploy finishes, check:

- Footer says **Copyright 2026**
- Resume PDF is ~115 KB: https://www.samiur.dev/Samiur_Rahman_Resume.pdf
- DevTools → Network → JS file is **not** `main.9eb4c81a.js` (hash will change)

## Optional: CLI (after `npx vercel login`)

```bash
cd Personal-Portfolio
npx vercel link          # pick your team + existing project
npx vercel --prod        # deploy latest local/build to production
```

## Auto-deploy going forward

With Git connected and **Production Branch = main**, every `git push origin main`
should trigger a new Vercel deployment automatically.
