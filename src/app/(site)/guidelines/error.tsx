"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function GuidelinesError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-5">
      <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
      <h1 className="mt-4 text-2xl font-bold text-slate-900">
        Заавар, зөвлөгөө ачаалахад алдаа гарлаа
      </h1>
      <p className="mt-2 text-slate-600">
        Серверийн алдаа эсвэл өгөгдлийн сангийн холболтын асуудал байж болзошгүй.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 items-center rounded-xl bg-cyan-700 px-5 text-sm font-bold text-white"
        >
          Дахин оролдох
        </button>
        <Link
          href="/contact"
          className="inline-flex min-h-11 items-center rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-800"
        >
          Холбоо барих
        </Link>
      </div>
    </div>
  );
}
