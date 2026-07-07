import { notFound } from "next/navigation";
import { NewsForm } from "../news-form";
import { AdminPageLayout } from "@/components/admin/admin-shell";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Мэдээ засах" };

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [news, categories] = await Promise.all([
    prisma.news.findUnique({ where: { id } }),
    prisma.category.findMany({
      where: { type: "NEWS", status: "ACTIVE" },
      orderBy: { name: "asc" },
    }),
  ]);

  if (!news) notFound();

  return (
    <AdminPageLayout>
      <h1 className="mb-6 text-2xl font-bold">Мэдээ засах</h1>
      <NewsForm
        categories={categories}
        initial={{
          id: news.id,
          title: news.title,
          summary: news.summary,
          content: news.content,
          image: news.image,
          categoryId: news.categoryId,
          status: news.status,
        }}
      />
    </AdminPageLayout>
  );
}
