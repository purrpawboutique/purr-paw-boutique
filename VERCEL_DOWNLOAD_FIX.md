# Fix: Vercel opens site by downloading a file

## Symptom
Vercel project shows **Ready**, but opening the domain downloads a file / shows JS bundle content.

## Root cause (in this repo)
This repo is **not a static-only app**. The build script `npm run build` runs `script/build.ts` which creates:
- `dist/public/index.html` (Vite SPA)
- `dist/index.cjs` (Node/Express server bundle)

When Vercel does not detect the intended SPA output, it may serve `dist/index.cjs` at `/` with `Content-Type: application/node`, which causes browsers to download/preview a file.

Additionally, the **build output (`dist/`) is not committed to GitHub**, so Vercel must build it during deployment.

## Correct Vercel settings (Dashboard)
Go to **Vercel → Project → Settings → Build & Development Settings** and set:

- **Framework Preset**: `Other`
- **Install Command**: `npm install`
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public`
  - (Important: set to `dist/public`, not `dist`)

Then trigger a new deployment (Redeploy / push a commit).

## Required file: vercel.json
Recommended `vercel.json` (this repo already has one, ensure it matches):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/public",
  "cleanUrls": true,
  "trailingSlash": false,
  "routes": [
    { "src": "/assets/(.*)", "dest": "/assets/$1" },
    { "src": "/images/(.*)", "dest": "/images/$1" },
    { "src": "/favicon.png", "dest": "/favicon.png" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

## Why your current deployment is still wrong
If `/` returns `application/node` and the response body starts with `"use strict";var ...`, Vercel is serving the **server bundle** (`dist/index.cjs`) instead of the SPA (`dist/public/index.html`).

That typically happens when **Output Directory** in Vercel is not set to `dist/public`.

## How to verify
After updating the settings and redeploying:

- `curl -I https://<your-domain>/` should return:
  - `content-type: text/html; charset=utf-8` (or `text/html`)
- `https://<your-domain>/assets/<hash>.js` should return `200`
- The site should render, not download.

## Notes
- Do **not** commit `dist/` to GitHub; let Vercel build it.
- If your Vercel build fails because Node is missing, set **Node.js Version** in Vercel to 18+.
