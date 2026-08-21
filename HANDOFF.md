# HANDOFF

## Outcome

`/` is a usable Helix chat UI (header, thread, composer, send). Typing a message POSTs to `/api/chat` and streams a reply through the Vercel AI Gateway. Not a title-only page. Not Shared Run. Not shua-labs.

## Repo

https://github.com/jmenzies722/helix

## Branch

`cursor/helix-chat-ui-d033` (PR to `main`)

## Done

- Homepage chat: Helix name, message thread, text composer, send control, empty state that invites you to text Helix
- `POST /api/chat` with Vercel AI SDK (`ai` + `@ai-sdk/react` `useChat`) and streamed UI messages
- Model routed through Vercel AI Gateway only (`@ai-sdk/gateway`)
- Exact model slug: `openai/gpt-5-nano`
- System prompt: Helix is CTO of Shua Labs; short replies; talk to Josh as you; first sentence is the answer; no company money, no medical diagnosis, no invented numbers
- No auth, payments, accounts, or extra pages
- TypeScript kept; no secrets in the tree
- README covers local run, texting Helix on `/`, Vercel as host, and `vercel env pull` for local OIDC

## Next

- Merge this PR
- Vercel auto-deploys production (`helix-bay-nine.vercel.app`)
- Confirm AI Gateway / OIDC is enabled on the Vercel project so streamed replies work in production

## Status

Ready for review. Model slug used: `openai/gpt-5-nano` (listed by `https://ai-gateway.vercel.sh/v1/models` at implement time).
