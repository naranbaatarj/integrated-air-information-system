"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Download } from "lucide-react";
import type { CoPoisoningCaseDto } from "@/lib/co-poisoning";
import { genderLabel } from "@/lib/co-poisoning";
import type { CoPoisoningOptionsByCategory } from "@/lib/co-poisoning-options";
import { downloadCsv } from "@/lib/co-poisoning-analytics";
import {
  ageGroupLabel,
  formatIsoDot,
  optionLabel,
  type FilterOption,
} from "@/lib/co-poisoning-filters";

const PAGE_SIZE = 10;

export function CoPoisoningRecordsTable({
  cases,
  outcomes,
  options,
}: {
  cases: CoPoisoningCaseDto[];
  outcomes: FilterOption[];
  options: CoPoisoningOptionsByCategory;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requestedPage = Math.max(1, Number(searchParams.get("page") || "1") || 1);
  const totalPages = Math.max(1, Math.ceil(cases.length / PAGE_SIZE));
  const page = Math.min(requestedPage, totalPages);
  const start = (page - 1) * PAGE_SIZE;
  const rows = cases.slice(start, start + PAGE_SIZE);

  const outcomeOptions = useMemo(
    () =>
      outcomes.length > 0
        ? outcomes
        : options.OUTCOME.filter((item) => item.code != null).map((item) => ({
            value: String(item.code),
            label: item.label,
          })),
    [options.OUTCOME, outcomes]
  );

  function goToPage(nextPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (nextPage <= 1) params.delete("page");
    else params.set("page", String(nextPage));
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function exportCsv() {
    downloadCsv("ugaaryn-hii-burtgel.csv", [
      ["Огноо", "Дүүрэг", "Хороо", "Нас", "Хүйс", "Шалтгаан", "Төлөв", "Биеийн байдал"],
      ...cases.map((item) => [
        formatIsoDot(item.poisonedAt.slice(0, 10)),
        item.soumName ?? "—",
        item.khoroo != null ? `${item.khoroo}-р хороо` : "—",
        ageGroupLabel(item.age),
        genderLabel(item.gender),
        item.cause?.trim() || "—",
        item.outcome == null ? "—" : optionLabel(outcomeOptions, String(item.outcome)),
        item.physicalCondition?.trim() || "—",
      ]),
    ]);
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 sm:px-5">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            {cases.length.toLocaleString("mn-MN")} бүртгэл
          </h2>
          <p className="text-xs text-slate-500">Шүүсэн үр дүнгийн хүснэгт</p>
        </div>
        <button
          type="button"
          onClick={exportCsv}
          className="inline-flex min-h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-extrabold text-slate-700 hover:border-teal-300 hover:bg-teal-50"
        >
          <Download className="size-4" aria-hidden="true" />
          CSV татах
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[720px] w-full text-left text-sm">
          <thead className="bg-slate-50 text-[11px] font-extrabold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Огноо</th>
              <th className="px-4 py-3">Дүүрэг, хороо</th>
              <th className="px-4 py-3">Насны бүлэг</th>
              <th className="px-4 py-3">Хүйс</th>
              <th className="px-4 py-3">Шалтгаан</th>
              <th className="px-4 py-3">Үр дагавар</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                  Шүүлтэд нийцсэн бүртгэл алга.
                </td>
              </tr>
            ) : (
              rows.map((item) => (
                <tr key={item.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 text-slate-700">
                    {formatIsoDot(item.poisonedAt.slice(0, 10))}
                  </td>
                  <td className="px-4 py-3 text-slate-800">
                    <strong className="font-semibold">{item.soumName ?? "—"}</strong>
                    {item.khoroo != null ? `, ${item.khoroo}-р хороо` : ""}
                  </td>
                  <td className="px-4 py-3 text-slate-700">{ageGroupLabel(item.age)}</td>
                  <td className="px-4 py-3 text-slate-700">{genderLabel(item.gender)}</td>
                  <td className="px-4 py-3 text-slate-700">{item.cause?.trim() || "—"}</td>
                  <td className="px-4 py-3">
                    <OutcomeBadge
                      label={
                        item.outcome == null
                          ? "—"
                          : optionLabel(outcomeOptions, String(item.outcome))
                      }
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {cases.length > PAGE_SIZE ? (
        <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 text-xs text-slate-600">
          <p>
            {start + 1}–{Math.min(start + PAGE_SIZE, cases.length)} /{" "}
            {cases.length.toLocaleString("mn-MN")}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => goToPage(page - 1)}
              className="min-h-8 rounded-lg border border-slate-200 px-3 font-bold disabled:opacity-40"
            >
              Өмнөх
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => goToPage(page + 1)}
              className="min-h-8 rounded-lg border border-slate-200 px-3 font-bold disabled:opacity-40"
            >
              Дараах
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function OutcomeBadge({ label }: { label: string }) {
  const tone = /нас бар|хүнд/i.test(label)
    ? "bg-rose-50 text-rose-800"
    : /зөвлөг|буцсан/i.test(label)
      ? "bg-emerald-50 text-emerald-800"
      : "bg-amber-50 text-amber-800";

  return (
    <span className={`inline-flex min-h-6 items-center rounded-full px-2 text-[11px] font-extrabold ${tone}`}>
      {label}
    </span>
  );
}
