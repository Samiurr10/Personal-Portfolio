# Hosting on samiur.dev (Vercel)

## 1. Deploy the site

If the project is already on Vercel, push to `main` and Vercel will redeploy automatically.

Otherwise:

```bash
cd Personal-Portfolio
npm install
npm run build
npx vercel --prod
```

Link the project to the existing GitHub repo `Samiurr10/Personal-Portfolio` in the Vercel dashboard.

## 2. Add the domain in Vercel

1. Open [vercel.com](https://vercel.com) → your **Personal-Portfolio** project
2. **Settings** → **Domains**
3. Add **`samiur.dev`**
4. Add **`www.samiur.dev`** (optional; redirects to apex via `vercel.json`)

## 3. DNS at your domain registrar

Where you bought **samiur.dev**, add these records (Vercel shows the exact values after you add the domain):

| Type | Name | Value |
|------|------|--------|
| **A** | `@` | `76.76.21.21` |
| **CNAME** | `www` | `cname.vercel-dns.com` |

If the registrar uses **nameservers**, you can instead point the domain to Vercel DNS from the Domains page.

Propagation can take from a few minutes up to 48 hours.

## 4. Environment variables (Vercel)

**Settings** → **Environment Variables** → Production:

| Variable | Value |
|----------|--------|
| `REACT_APP_SITE_URL` | `https://samiur.dev` |
| `REACT_APP_CONTACT_EMAIL` | `srahman96@gatech.edu` |
| `REACT_APP_API_URL` | *(leave empty until backend is deployed)* |

Redeploy after saving variables.

## 5. Old Vercel URL

After `samiur.dev` works, in Vercel **Domains**, keep the `*.vercel.app` URL or set the old deployment URL to redirect to `https://samiur.dev` in **Settings → Domains**.

## 6. GitHub profile

Update **Settings → Profile → Website** to `https://samiur.dev`.
