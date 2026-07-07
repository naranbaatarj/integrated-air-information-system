import Link from "next/link";
import Image from "next/image";
import { Search, Wind } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Нүүр" },
  { href: "/about", label: "Бидний тухай" },
  { href: "/services", label: "Үйлчилгээ" },
  { href: "/open-info", label: "Нээлттэй мэдээлэл" },
  { href: "/guidelines", label: "Заавар, зөвлөгөө" },
  { href: "/news", label: "Мэдээ" },
  { href: "/air-quality", label: "Агаарын чанар" },
  { href: "/contact", label: "Холбоо барих" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-sky-700">
          <Wind className="h-7 w-7" />
          <span className="text-lg">Агаар</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-sky-50 hover:text-sky-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Хайх</span>
          </Link>
        </div>
      </div>

      <nav className="flex gap-1 overflow-x-auto border-t border-slate-100 px-4 py-2 lg:hidden">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="whitespace-nowrap rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-700"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4 sm:px-6">
        <div>
          <div className="mb-3 flex items-center gap-2 text-white">
            <Wind className="h-6 w-6" />
            <span className="font-semibold">Агаар</span>
          </div>
          <p className="text-sm leading-relaxed">
            Утаа, агаарын бохирдлоос урьдчилан сэргийлэх мэдээ, зөвлөгөө, үйлчилгээний мэдээлэл.
          </p>
        </div>
        <div>
          <h3 className="mb-3 font-medium text-white">Холбоос</h3>
          <ul className="space-y-2 text-sm">
            {navLinks.slice(1, 5).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-medium text-white">Мэдээлэл</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/news" className="hover:text-white">
                Мэдээ, мэдээлэл
              </Link>
            </li>
            <li>
              <Link href="/air-quality" className="hover:text-white">
                Агаарын чанар
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Холбоо барих
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-medium text-white">Холбоо барих</h3>
          <ul className="space-y-2 text-sm">
            <li>info@agaar.mn</li>
            <li>+976 7011-1234</li>
            <li>Улаанбаатар хот</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Агаар — Утаанаас сэргийлэх систем
      </div>
    </footer>
  );
}

export function PageHero({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "bg-gradient-to-br from-sky-600 to-cyan-700 px-4 py-12 text-white sm:px-6",
        className
      )}
    >
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
        {description && <p className="mt-3 max-w-3xl text-sky-50">{description}</p>}
      </div>
    </section>
  );
}

export function ContentCard({
  title,
  summary,
  href,
  date,
  category,
  image,
}: {
  title: string;
  summary: string;
  href: string;
  date?: string;
  category?: string;
  image?: string | null;
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      {image ? (
        <Link href={href} className="relative block aspect-[16/10] overflow-hidden bg-slate-100">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition duration-300 hover:scale-105"
            unoptimized
          />
        </Link>
      ) : null}
      <div className="flex flex-1 flex-col p-5">
        {category && (
          <span className="mb-2 inline-block w-fit rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-700">
            {category}
          </span>
        )}
        <h3 className="text-lg font-semibold text-slate-900">
          <Link href={href} className="hover:text-sky-700">
            {title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{summary}</p>
        <div className="mt-4 flex items-center justify-between text-sm">
          {date && <span className="text-slate-500">{date}</span>}
          <Link href={href} className="font-medium text-sky-700 hover:underline">
            Дэлгэрэнгүй →
          </Link>
        </div>
      </div>
    </article>
  );
}
