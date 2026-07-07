import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/site-chrome";
import { prisma } from "@/lib/prisma";
import { ContentStatus } from "@/generated/prisma/client";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await prisma.openInfo.findFirst({ where: { slug, status: ContentStatus.PUBLISHED } });
  return { title: item?.title ?? "Нээлттэй мэдээлэл" };
}

export default async function OpenInfoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await prisma.openInfo.findFirst({
    where: { slug, status: ContentStatus.PUBLISHED },
    include: { category: true },
  });

  if (!item) notFound();

  return (
    <>
      <PageHero title={item.title} description={item.summary} />
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="mb-4 flex flex-wrap gap-3 text-sm text-slate-500">
          {item.category && <span>{item.category.name}</span>}
          {item.publishedAt && <span>{formatDate(item.publishedAt)}</span>}
        </div>
        <div className="prose-content" dangerouslySetInnerHTML={{ __html: item.content }} />
        {item.fileUrl && (
          <Link
            href={item.fileUrl}
            className="mt-6 inline-flex rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white"
            target="_blank"
          >
            Файл татах
          </Link>
        )}
      </article>
    </>
  );
}
