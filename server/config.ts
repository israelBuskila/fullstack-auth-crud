import dotenv from 'dotenv';

dotenv.config();

export const config = {
  isProduction: process.env.NODE_ENV === 'production',
  databaseUrl: process.env.DATABASE_URL!,
  jwtSecret: process.env.JWT_SECRET || 'default-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
};
