import 'dotenv/config';
import type { Config } from 'drizzle-kit';

// Por padrão, usa a URL de desenvolvimento.
// Adapte esta lógica se precisar de múltiplos ambientes (staging, prod).
const connectionString = process.env.DATABASE_URL_DEV;

if (!connectionString) {
  throw new Error('DATABASE_URL_DEV não está definida no seu arquivo .env');
}

export default {
  schema: './src/lib/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: connectionString,
  },
  verbose: true,
  strict: true,
} satisfies Config;
