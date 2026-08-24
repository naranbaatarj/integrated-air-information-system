import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function OpenDataCta() {
  return (
    <section className="px-4 py-8 sm:px-5 sm:py-12" aria-labelledby="open-data-title">
      <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[30px] bg-gradient-to-br from-slate-900 via-cyan-950 to-cyan-800 px-6 py-8 text-white shadow-xl sm:px-10 sm:py-10">
        <div
          className="pointer-events-none absolute -bottom-52 -right-28 h-96 w-96 rounded-full border-[55px] border-white/5"
          aria-hidden="true"
        />
        <div className="relative grid items-center gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <h2 id="open-data-title" className="text-3xl font-extrabold leading-tight sm:text-4xl">
              Агаарын чанарын өгөгдлийг ашиглаарай
            </h2>
            <p className="mt-3 max-w-2xl text-white/75">
              Нээлттэй өгөгдөл, түүхэн хэмжилт болон API холболтын мэдээллийг татаж авах,
              судалгаанд ашиглах боломжтой.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <Link
              href="/open-info"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-bold text-slate-900"
            >
              Өгөгдөл татах
            </Link>
            <Link
              href="/open-info"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/35 bg-white/10 px-5 text-sm font-bold text-white"
            >
              Архиваас харах
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
