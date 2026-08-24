import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

type NewsItem = {
  id: string;
  title: string;
  summary: string;
  slug: string;
  publishedAt: Date | null;
  image: string | null;
  category?: { name: string } | null;
};

export function LatestContent({ news }: { news: NewsItem[] }) {
  if (news.length === 0) return null;

  const [featured, ...rest] = news;

  return (
    <section className="px-4 py-16 sm:px-5 sm:py-[74px]" aria-labelledby="news-title">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-1.5 text-[13px] font-extrabold uppercase tracking-wider text-cyan-700">
              Шинэ мэдээлэл
            </p>
            <h2 id="news-title" className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Мэдээ, сэрэмжлүүлэг
            </h2>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-sm font-extrabold text-cyan-700"
          >
            Бүх мэдээ
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <article className="relative flex min-h-[360px] items-end overflow-hidden rounded-[26px] bg-gradient-to-br from-cyan-800 to-slate-800 text-white shadow-xl">
            {featured.image && (
              <Image
                src={featured.image}
                alt=""
                fill
                className="object-cover opacity-30"
                unoptimized
              />
            )}
            <div className="relative p-6 sm:p-8">
              <span className="inline-flex rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-extrabold">
                {featured.category?.name ?? "Онцлох"}
              </span>
              <h3 className="mt-3 max-w-2xl text-2xl font-extrabold leading-tight sm:text-3xl">
                <Link href={`/news/${featured.slug}`} className="hover:underline">
                  {featured.title}
                </Link>
              </h3>
              <p className="mt-2 max-w-2xl text-white/80">{featured.summary}</p>
              {featured.publishedAt && (
                <p className="mt-4 text-xs text-white/70">
                  {formatDate(featured.publishedAt)}
                </p>
              )}
            </div>
          </article>

          <div className="grid gap-3.5">
            {rest.map((item, i) => (
              <article
                key={item.id}
                className="grid min-h-[124px] grid-cols-[92px_1fr] gap-3.5 rounded-[20px] border border-slate-200 bg-white p-3 shadow-sm sm:grid-cols-[108px_1fr]"
              >
                <div
                  className={`rounded-[14px] ${
                    i === 0
                      ? "bg-gradient-to-br from-cyan-300 to-cyan-700"
                      : i === 1
                        ? "bg-gradient-to-br from-amber-200 to-amber-600"
                        : "bg-gradient-to-br from-emerald-200 to-emerald-600"
                  }`}
                >
                  {item.image && (
                    <Image
                      src={item.image}
                      alt=""
                      width={108}
                      height={108}
                      className="h-full w-full rounded-[14px] object-cover"
                      unoptimized
                    />
                  )}
                </div>
                <div>
                  <small className="text-[11px] font-extrabold text-cyan-700">
                    {item.category?.name ?? "Мэдээ"}
                  </small>
                  <h4 className="mt-1 text-[15px] font-bold leading-snug text-slate-900">
                    <Link href={`/news/${item.slug}`} className="hover:text-cyan-700">
                      {item.title}
                    </Link>
                  </h4>
                  {item.publishedAt && (
                    <time className="mt-2 block text-[11px] text-slate-400">
                      {formatDate(item.publishedAt)}
                    </time>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
