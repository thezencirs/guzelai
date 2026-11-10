import { createAuthClient } from "@neon/neon-js/auth";

const authUrl = import.meta.env.VITE_NEON_AUTH_URL as string | undefined;
export const authClient = authUrl ? createAuthClient(authUrl) : null;
