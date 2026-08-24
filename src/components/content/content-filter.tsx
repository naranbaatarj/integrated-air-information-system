"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = { slug: string; name: string };

export function ContentFilter({
  basePath,
  categories,
  activeCategory,
  activeQuery,
  searchPlaceholder = "Хайх...",
}: {
  basePath: string;
  categories: Category[];
  activeCategory?: string;
  activeQuery?: string;
  searchPlaceholder?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(activeQuery ?? "");
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setQuery(activeQuery ?? "");
  }, [activeQuery]);

  const navigate = useCallback(
    (next: { category?: string | null; q?: string | null }) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next.category === null || next.category === undefined) {
        params.delete("category");
      } else if (next.category) {
        params.set("category", next.category);
      }
      if (next.q === null || next.q === undefined) {
        params.delete("q");
      } else if (next.q.trim()) {
        params.set("q", next.q.trim());
      } else {
        params.delete("q");
      }
      const qs = params.toString();
      startTransition(() => {
        router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    },
    [pathname, router, searchParams]
  );

  return (
    <div className={cn("space-y-4", pending && "opacity-70 transition-opacity")}>
      <form
        className="relative max-w-md"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ q: query });
        }}
        role="search"
      >
        <label htmlFor={`search-${basePath}`} className="sr-only">
          {searchPlaceholder}
        </label>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          id={`search-${basePath}`}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="min-h-11 w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm outline-none ring-cyan-600 focus:border-cyan-300 focus:ring-2"
        />
      </form>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Ангиллаар шүүх">
        <button
          type="button"
          onClick={() => navigate({ category: null })}
          className={cn(
            "min-h-9 rounded-full px-3.5 py-1.5 text-sm font-semibold transition",
            !activeCategory
              ? "bg-cyan-700 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          )}
        >
          Бүгд
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            type="button"
            onClick={() => navigate({ category: cat.slug })}
            className={cn(
              "min-h-9 rounded-full px-3.5 py-1.5 text-sm font-semibold transition",
              activeCategory === cat.slug
                ? "bg-cyan-700 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
