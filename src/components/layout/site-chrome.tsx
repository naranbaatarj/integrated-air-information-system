import Link from "next/link";
import type { ReactNode } from "react";
import Image from "next/image";
import { Wind } from "lucide-react";
import { cn } from "@/lib/utils";

const footerLinks = {
  main: [
    { href: "/air-quality", label: "Агаарын чанар" },
    { href: "/guidelines", label: "Зөвлөмж" },
    { href: "/news", label: "Мэдээ" },
    { href: "/open-info", label: "Нээлттэй мэдээлэл" },
  ],
  help: [
    { href: "/about", label: "Бидний тухай" },
    { href: "/co-poisoning", label: "Угаарын хий" },
    { href: "/services", label: "Үйлчилгээ" },
    { href: "/search", label: "Хайлт" },
  ],
  contact: [
    { href: "mailto:info@agaar.mn", label: "info@agaar.mn" },
    { href: "tel:+97670111234", label: "+976 7011-1234" },
    { href: "/contact", label: "Санал хүсэлт илгээх" },
  ],
};

export function Footer() {
  return (
    <footer className="mt-auto bg-[var(--ink-950)] text-slate-300">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-4 py-14 sm:grid-cols-2 sm:px-5 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-[14px] bg-gradient-to-br from-cyan-600 to-blue-700 text-white">
              <Wind className="h-5 w-5" />
            </span>
            <div>
              <span className="block text-lg font-extrabold text-white">АГААР</span>
              <span className="text-[11px] text-slate-400">Утаанаас сэргийлэх нэгдсэн систем</span>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
            Утаа, агаарын бохирдлоос урьдчилан сэргийлэх мэдээ, зөвлөгөө, агаарын чанарын
            индексийн мэдээлэл.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold text-white">Үндсэн холбоос</h3>
          <ul className="grid gap-2.5 text-[13px]">
            {footerLinks.main.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-slate-400 transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold text-white">Тусламж</h3>
          <ul className="grid gap-2.5 text-[13px]">
            {footerLinks.help.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-slate-400 transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold text-white">Холбоо барих</h3>
          <ul className="grid gap-2.5 text-[13px]">
            {footerLinks.contact.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-slate-400 transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-3 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:px-5">
          <p>© {new Date().getFullYear()} Агаар — Утаанаас сэргийлэх систем</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/about" className="hover:text-slate-300">
              Нөхцөл
            </Link>
            <Link href="/about" className="hover:text-slate-300">
              Нууцлал
            </Link>
          </div>
        </div>
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
        "relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-[#f7fcfd] to-[#edf7f9] px-4 py-12 sm:px-5 sm:py-14",
        className
      )}
    >
      <div className="relative mx-auto max-w-[1240px]">
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--ink-950)] sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-3xl text-base text-slate-600 sm:text-lg">{description}</p>
        )}
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
    <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-md">
      {image ? (
        <Link href={href} className="relative block aspect-[16/10] overflow-hidden bg-slate-100">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            unoptimized
          />
        </Link>
      ) : (
        <div className="h-1.5 bg-gradient-to-r from-cyan-600 via-teal-500 to-blue-600" />
      )}
      <div className="flex flex-1 flex-col p-5">
        {category && (
          <span className="mb-2 inline-block w-fit rounded-md bg-cyan-50 px-2.5 py-0.5 text-xs font-semibold text-cyan-700 ring-1 ring-cyan-100">
            {category}
          </span>
        )}
        <h3 className="text-lg font-semibold tracking-tight text-slate-900">
          <Link href={href} className="transition hover:text-cyan-700">
            {title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{summary}</p>
        <div className="mt-4 flex items-center justify-between text-sm">
          {date && <span className="text-slate-400">{date}</span>}
          <Link
            href={href}
            className="font-semibold text-cyan-700 transition group-hover:translate-x-0.5"
          >
            Дэлгэрэнгүй →
          </Link>
        </div>
      </div>
    </article>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="mb-2 text-[13px] font-extrabold uppercase tracking-wider text-cyan-700">
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">{title}</h2>
        {description && <p className="mt-2 text-slate-600">{description}</p>}
      </div>
      {action}
    </div>
  );
}

// Legacy export — header moved to site-header.tsx
export { SiteHeader as Header, SiteTopbar } from "@/components/layout/site-header";
