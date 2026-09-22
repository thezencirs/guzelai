# GüzelAI Production AI Setup

## 1. Vercel Environment Variables

Add these to the **Production**, **Preview**, and **Development** environments as appropriate:

- `GEMINI_API_KEY` — GüzelAI platform-owned Gemini API key. Required for platform-credit mode.
- `AI_KEY_ENCRYPTION_SECRET` — long random secret used to encrypt BYOK keys in HttpOnly cookies.
- `GEMINI_TEXT_MODEL=gemini-3.6-flash`
- `GEMINI_IMAGE_MODEL=gemini-3.1-flash-image`
- `VEO_MODEL=veo-3.1-generate-preview`
- `APP_URL=https://www.guzelai.com`

## 2. Google Sign-In

Create a Google OAuth **Web application** Client ID.

Authorized JavaScript origins:
- `https://www.guzelai.com`
- `https://guzelai.com`

Set the same client ID in:
- `VITE_GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_ID`

Redeploy after changing any `VITE_*` value because Vite injects it at build time.

## 3. Layered AI Modes

### Platform mode
GüzelAI uses `GEMINI_API_KEY`. This is the future credit/billing mode.

### BYOK mode
The user enters their own Gemini API/auth key. GüzelAI validates it against the Gemini API and stores only an encrypted value inside a Secure HttpOnly cookie. The browser JavaScript cannot read the stored key.

## 4. Real production routes

- `GET /api/health-ai` — non-secret readiness status.
- `GET|POST|DELETE /api/settings/ai-key` — layered AI mode / BYOK connection.
- `GET|POST /api/settings/test-ai` — visible text/image/video capability check.
- `POST /api/images/generate-model` — master portrait + full-body Character Lock pack.
- `POST /api/videos/create` — starts a Veo 3.1 long-running 9:16 render.
- `GET /api/videos/status?id=...` — polls the Veo render and returns the final video URL.
- `POST /api/auth/google` — verifies Google Identity Services ID tokens.

## 5. Product behavior

A newly generated model is created with two identity references: a master portrait and a full-body reference. The model object is then inserted into the live GüzelAI roster. Clips uses that model image as the Veo reference so subsequent ads can preserve character identity as closely as the current generation model allows.

## 6. Next persistence step

The current UI keeps the logged-in profile and live roster in browser/app state. Before charging real money or selling credits, add a persistent database/auth layer (recommended: Supabase/Postgres) for users, credit transactions, model assets, jobs, and brand kits. Do not treat the current local credit count as a financial ledger.
