import "dotenv/config";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../src/generated/prisma/client";
import { DEFAULT_CO_POISONING_OPTIONS } from "../src/lib/co-poisoning-options";

const prisma = new PrismaClient({
  adapter: new PrismaLibSql({
    url: process.env.DATABASE_URL ?? "file:./dev.db",
  }),
});

async function main() {
  const count = await prisma.coPoisoningOption.count();
  if (count > 0) {
    console.log(`Options already exist (${count}). Skipping.`);
    return;
  }

  await prisma.coPoisoningOption.createMany({
    data: DEFAULT_CO_POISONING_OPTIONS.map((o) => ({
      category: o.category,
      label: o.label,
      code: o.code ?? null,
      sortOrder: o.sortOrder,
      status: "ACTIVE" as const,
    })),
  });

  console.log(`Seeded ${DEFAULT_CO_POISONING_OPTIONS.length} options.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
