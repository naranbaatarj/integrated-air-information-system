import { Suspense } from "react";
import { PageHero, ContentCard } from "@/components/layout/site-chrome";
import { ContentFilter } from "@/components/content/content-filter";
import { Skeleton } from "@/components/ui/skeleton";
import { prisma } from "@/lib/prisma";
import { ContentStatus } from "@/generated/prisma/client";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Мэдээ, мэдээлэл" };

function FilterSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-11 w-full max-w-md" />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-24 rounded-full" />
        ))}
      </div>
    </div>
  );
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;
  const categories = await prisma.category.findMany({
    where: { type: "NEWS", status: "ACTIVE" },
    orderBy: { name: "asc" },
  });

  const query = q?.trim();
  const news = await prisma.news.findMany({
    where: {
      status: ContentStatus.PUBLISHED,
      ...(category ? { category: { slug: category } } : {}),
      ...(query
        ? {
            OR: [{ title: { contains: query } }, { summary: { contains: query } }],
          }
        : {}),
    },
    include: { category: true, createdBy: { select: { name: true } } },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <PageHero
        title="Мэдээ, мэдээлэл"
        description="Цаг үеийн мэдээ, сэрэмжлүүлэг, зарлал, зөвлөмжийн нийтлэлүүд"
      />
      <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-5">
        <Suspense fallback={<FilterSkeleton />}>
          <ContentFilter
            basePath="/news"
            categories={categories.map((c) => ({ slug: c.slug, name: c.name }))}
            activeCategory={category}
            activeQuery={query}
            searchPlaceholder="Мэдээ хайх..."
          />
        </Suspense>

        {news.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
            <p className="text-lg font-semibold text-slate-800">Мэдээ олдсонгүй</p>
            <p className="mt-2 text-sm text-slate-600">
              {query || category
                ? "Шүүлтүүрээ өөрчилж дахин хайна уу."
                : "Одоогоор нийтлэгдсэн мэдээ байхгүй байна."}
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <ContentCard
                key={item.id}
                title={item.title}
                summary={item.summary}
                href={`/news/${item.slug}`}
                date={item.publishedAt ? formatDate(item.publishedAt) : undefined}
                category={item.category?.name}
                image={item.image}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
