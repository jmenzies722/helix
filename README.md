# Helix

Text Helix on `/`. Helix is a Next.js App Router (TypeScript) chat app hosted on Vercel.

Production: [helix-bay-nine.vercel.app](https://helix-bay-nine.vercel.app)

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The homepage is a chat. Type a message and send it.

```bash
npm run build
```

confirms the production build.

### AI Gateway for local replies

Streaming replies go through the [Vercel AI Gateway](https://vercel.com/docs/ai-gateway) only. Do not set `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, or any other provider key.

On Vercel production, prefer OIDC / platform auth so the app can call the gateway without a committed key.

For local development, link the Vercel project and pull env:

```bash
npx vercel link
npx vercel env pull .env.local
```

That writes a short-lived `VERCEL_OIDC_TOKEN` (about 24 hours). Re-run `npx vercel env pull .env.local` when it expires.

Do not commit `.env*` files.

## Deploy

Vercel is the host. This GitHub repo is the Vercel project. Merges to `main` auto-deploy.

Enable AI Gateway on the Vercel project so production authenticates with OIDC.
