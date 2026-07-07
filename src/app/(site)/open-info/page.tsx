import { PageHero, ContentCard } from "@/components/layout/site-chrome";
import { prisma } from "@/lib/prisma";
import { ContentStatus } from "@/generated/prisma/client";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Нээлттэй мэдээлэл" };

export default async function OpenInfoPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const categories = await prisma.category.findMany({
    where: { type: "OPEN_INFO", status: "ACTIVE" },
    orderBy: { name: "asc" },
  });

  const items = await prisma.openInfo.findMany({
    where: {
      status: ContentStatus.PUBLISHED,
      ...(category ? { category: { slug: category } } : {}),
    },
    include: { category: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <PageHero
        title="Нээлттэй мэдээлэл"
        description="Тайлан, судалгаа, статистик, төсөл хөтөлбөрийн мэдээлэл"
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-6 flex flex-wrap gap-2">
          <a
            href="/open-info"
            className={`rounded-full px-3 py-1 text-sm ${!category ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700"}`}
          >
            Бүгд
          </a>
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/open-info?category=${cat.slug}`}
              className={`rounded-full px-3 py-1 text-sm ${category === cat.slug ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700"}`}
            >
              {cat.name}
            </a>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ContentCard
              key={item.id}
              title={item.title}
              summary={item.summary}
              href={`/open-info/${item.slug}`}
              date={item.publishedAt ? formatDate(item.publishedAt) : undefined}
              category={item.category?.name}
            />
          ))}
        </div>
      </div>
    </>
  );
}
