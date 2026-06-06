import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

let databaseUrl: string | undefined;
try {
  databaseUrl = process.env.DATABASE_URL;
} catch {}

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

export const db = (() => {
  if (!databaseUrl) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("DATABASE_URL is not set. Database features will be unavailable.");
    }
    return null;
  }

  const pool =
    globalForDb.__arenaNextJsPostgresqlPool ??
    new Pool({
      connectionString: databaseUrl,
    });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.__arenaNextJsPostgresqlPool = pool;
  }

  return drizzle(pool);
})();
