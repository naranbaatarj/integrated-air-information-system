import { notFound } from "next/navigation";
import { GuidelineForm } from "../guideline-form";
import { AdminPageLayout } from "@/components/admin/admin-shell";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Зөвлөгөө засах" };

export default async function EditGuidelinePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [guideline, categories] = await Promise.all([
    prisma.guideline.findUnique({ where: { id } }),
    prisma.category.findMany({
      where: { type: "GUIDELINE", status: "ACTIVE" },
      orderBy: { name: "asc" },
    }),
  ]);

  if (!guideline) notFound();

  return (
    <AdminPageLayout>
      <h1 className="mb-6 text-2xl font-bold">Заавар, зөвлөгөө засах</h1>
      <GuidelineForm
        categories={categories}
        initial={{
          id: guideline.id,
          title: guideline.title,
          summary: guideline.summary,
          content: guideline.content,
          image: guideline.image,
          categoryId: guideline.categoryId,
          status: guideline.status,
        }}
      />
    </AdminPageLayout>
  );
}
