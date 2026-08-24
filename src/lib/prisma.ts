import "dotenv/config";
import { copyFileSync, existsSync } from "node:fs";
import path from "node:path";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function resolveLibSqlConfig() {
  const url = process.env.DATABASE_URL ?? "file:./dev.db";
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url.startsWith("file:")) {
    return { url, authToken };
  }

  // Vercel’s serverless filesystem is read-only except `/tmp`.
  if (process.env.VERCEL) {
    const source = path.join(process.cwd(), "dev.db");
    const dest = "/tmp/dev.db";
    if (!existsSync(dest)) {
      if (!existsSync(source)) {
        throw new Error(
          `SQLite database not found at ${source}. Set a remote DATABASE_URL or include dev.db in the deployment.`
        );
      }
      copyFileSync(source, dest);
    }
    return { url: `file:${dest}` };
  }

  return { url };
}

function createPrismaClient() {
  const adapter = new PrismaLibSql(resolveLibSqlConfig());
  return new PrismaClient({ adapter });
}

function getPrismaClient() {
  const existing = globalForPrisma.prisma;
  // After `prisma generate`, HMR can keep a stale client without new models.
  if (existing?.coPoisoningOption && existing?.coPoisoningCase) {
    return existing;
  }
  const client = createPrismaClient();
  globalForPrisma.prisma = client;
  return client;
}

export const prisma = getPrismaClient();
