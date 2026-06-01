# Laa Tansa Farm (Static Site)

This is a static marketing site for Laa Tansa Farm. It's ready to deploy as static files (HTML/CSS/JS) on platforms like Vercel.

Quick deploy to Vercel

1. Install Vercel CLI (optional):

```bash
npm i -g vercel
```

2. From this project folder, run:

```bash
vercel --prod
```

3. Or connect the repository in the Vercel dashboard and deploy the default branch. Vercel will serve the static files automatically.

Notes

- `prices.json` is a static JSON file used by the page to update prices without changing HTML.
- If you add high-resolution images, include `srcset` and `width`/`height` for best performance.
- The site uses `localStorage` to remember theme (dark/light).

If you want, I can add a small `vercel.json` with headers or redirects, or set up a CI flow for previews.
