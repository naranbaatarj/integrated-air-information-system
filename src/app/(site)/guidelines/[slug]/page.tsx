import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/site-chrome";
import { prisma } from "@/lib/prisma";
import { ContentStatus } from "@/generated/prisma/client";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await prisma.guideline.findFirst({
    where: { slug, status: ContentStatus.PUBLISHED },
  });
  return { title: item?.title ?? "Зөвлөгөө" };
}

export default async function GuidelineDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await prisma.guideline.findFirst({
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
      </article>
    </>
  );
}
