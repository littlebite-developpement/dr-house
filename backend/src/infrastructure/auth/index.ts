import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '../database/index.js';
import { user, session, account, verification } from '../database/schema/auth.js';
import { Hono } from 'hono';
import { bearer } from 'better-auth/plugins';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 jours
    updateAge: 60 * 60 * 24, // 1 jour
  },
  secret: process.env.BETTER_AUTH_SECRET ?? 'saafara-diab-better-auth-secret',
  baseURL: process.env.BETTER_AUTH_URL ?? 'http://localhost:3000',
  plugins: [
    bearer(),
  ],
});

export type Auth = typeof auth;
