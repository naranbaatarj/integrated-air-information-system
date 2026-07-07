import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/site-chrome";
import { prisma } from "@/lib/prisma";
import { ContentStatus } from "@/generated/prisma/client";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await prisma.news.findFirst({ where: { slug, status: ContentStatus.PUBLISHED } });
  return { title: item?.title ?? "Мэдээ" };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await prisma.news.findFirst({
    where: { slug, status: ContentStatus.PUBLISHED },
    include: { category: true, createdBy: { select: { name: true } } },
  });

  if (!item) notFound();

  return (
    <>
      <PageHero title={item.title} description={item.summary} />
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="mb-4 flex flex-wrap gap-3 text-sm text-slate-500">
          {item.category && <span>{item.category.name}</span>}
          {item.publishedAt && <span>{formatDate(item.publishedAt)}</span>}
          <span>{item.createdBy.name}</span>
        </div>
        {item.image && (
          <div className="relative mb-8 aspect-video overflow-hidden rounded-xl">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        )}
        <div className="prose-content" dangerouslySetInnerHTML={{ __html: item.content }} />
      </article>
    </>
  );
}
