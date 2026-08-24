"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, Wind, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Нүүр" },
  { href: "/air-quality", label: "Агаарын чанар" },
  { href: "/guidelines", label: "Зөвлөмж" },
  { href: "/news", label: "Мэдээ" },
  { href: "/open-info", label: "Нээлттэй мэдээлэл" },
  { href: "/about", label: "Бидний тухай" },
];

function BrandMark() {
  return (
    <span
      className="inline-flex h-10 w-10 items-center justify-center rounded-[14px] bg-gradient-to-br from-cyan-600 to-blue-700 text-white shadow-[0_8px_24px_rgba(11,149,167,0.24)] sm:h-[42px] sm:w-[42px]"
      aria-hidden="true"
    >
      <Wind className="h-6 w-6" />
    </span>
  );
}

export function SiteTopbar() {
  const now = new Date();
  const dateStr = now.toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const dayStr = now.toLocaleDateString("mn-MN", { weekday: "long" });

  return (
    <div className="bg-[var(--ink-950)] text-[13px] text-cyan-50">
      <div className="mx-auto flex min-h-[38px] max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-5">
        <div className="flex items-center gap-4 sm:gap-[18px]">
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
            {dateStr} · {dayStr}
          </span>
          <span className="hidden items-center gap-1.5 whitespace-nowrap sm:inline-flex">
            Улаанбаатар хот
          </span>
        </div>
        <div className="hidden items-center gap-[18px] md:flex">
          <a href="tel:+97670111234" className="whitespace-nowrap hover:text-white">
            7011-1234
          </a>
          <span className="whitespace-nowrap">MN</span>
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/75 bg-white/94 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[68px] max-w-[1240px] items-center gap-4 px-4 sm:min-h-[78px] sm:gap-6 sm:px-5">
          <Link href="/" className="inline-flex min-w-max items-center gap-2.5" aria-label="АГААР нүүр хуудас">
            <BrandMark />
            <span>
              <span className="block text-base font-extrabold tracking-wide text-[var(--ink-950)] sm:text-lg">
                АГААР
              </span>
              <span className="hidden text-[11px] text-slate-500 sm:block">
                Утаанаас сэргийлэх нэгдсэн систем
              </span>
            </span>
          </Link>

          <nav className="ml-auto hidden lg:block" aria-label="Үндсэн цэс">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative inline-flex min-h-11 items-center rounded-[11px] px-3 text-sm font-semibold transition",
                        active
                          ? "bg-cyan-50 text-cyan-700"
                          : "text-slate-700 hover:bg-cyan-50/60 hover:text-cyan-700"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Link
              href="/search"
              className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              aria-label="Хайлт нээх"
            >
              <Search className="h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="hidden min-h-[42px] items-center justify-center rounded-xl bg-[var(--ink-950)] px-4 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800 sm:inline-flex"
            >
              Санал хүсэлт
            </Link>
            <button
              type="button"
              className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 lg:hidden"
              aria-label="Цэс нээх"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-panel"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[60] bg-slate-950/45 transition-opacity lg:hidden",
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        )}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="mobile-nav-panel"
        className={cn(
          "fixed inset-y-0 right-0 z-[70] w-[min(86vw,360px)] bg-white p-5 shadow-[-20px_0_50px_rgba(7,27,43,0.2)] transition-transform duration-200 lg:hidden",
          menuOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-label="Гар утасны цэс"
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-between gap-4">
          <span className="text-lg font-extrabold text-slate-900">Цэс</span>
          <button
            type="button"
            className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-slate-200"
            aria-label="Цэс хаах"
            onClick={() => setMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="mt-7 grid gap-1">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-xl px-3 py-3 text-sm font-bold",
                  active
                    ? "bg-cyan-50 text-cyan-700"
                    : "text-slate-700 hover:bg-slate-50"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="mt-3 inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--ink-950)] px-4 text-sm font-bold text-white"
          >
            Санал хүсэлт
          </Link>
        </nav>
      </aside>
    </>
  );
}
