export const config = {
  port: parseInt(process.env.PORT ?? '3000', 10),
  databaseUrl: process.env.DATABASE_URL ?? 'postgres://postgres:postgres@localhost:5432/saafara_diab',
  jwtSecret: process.env.JWT_SECRET ?? 'saafara-diab-secret-key-change-in-production',
  nodeEnv: process.env.NODE_ENV ?? 'development',
};
