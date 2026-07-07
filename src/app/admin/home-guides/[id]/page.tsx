import { notFound } from "next/navigation";
import { AdminPageLayout } from "@/components/admin/admin-shell";
import { prisma } from "@/lib/prisma";
import { HomeGuideForm } from "../home-guide-form";

export const metadata = { title: "Заавар засах" };

export default async function EditHomeGuidePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const guide = await prisma.homeGuide.findUnique({ where: { id } });

  if (!guide) notFound();

  return (
    <AdminPageLayout>
      <h1 className="mb-6 text-2xl font-bold">Заавар зөвлөгөө засах</h1>
      <HomeGuideForm
        initial={{
          id: guide.id,
          question: guide.question,
          content: guide.content,
          videoUrl: guide.videoUrl,
          linkUrl: guide.linkUrl,
          linkLabel: guide.linkLabel,
          sortOrder: guide.sortOrder,
          status: guide.status,
        }}
      />
    </AdminPageLayout>
  );
}
