import Link from "next/link";
import { AdminPageLayout } from "@/components/admin/admin-shell";
import { prisma } from "@/lib/prisma";
import type { CoPoisoningOptionDto } from "@/lib/co-poisoning-options";
import { CoPoisoningOptionsManager } from "./options-manager";

export const metadata = { title: "Угаарын хий · Тохиргоо" };

export default async function CoPoisoningOptionsPage() {
  const options = await prisma.coPoisoningOption.findMany({
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }, { label: "asc" }],
  });

  return (
    <AdminPageLayout>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Бүртгэлийн тохиргоо</h1>
          <p className="mt-1 text-sm text-slate-500">
            Мэдээлсэн байгууллага, угаартсан газар, эмнэлэгт хандсан байдал, биеийн байдал,
            төлөв, шалтгааны утгуудыг удирдах
          </p>
        </div>
        <Link
          href="/admin/co-poisoning"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          ← Бүртгэл рүү буцах
        </Link>
      </div>

      <CoPoisoningOptionsManager initialOptions={options as CoPoisoningOptionDto[]} />
    </AdminPageLayout>
  );
}
