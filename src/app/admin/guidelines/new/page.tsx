import { GuidelineForm } from "../guideline-form";
import { AdminPageLayout } from "@/components/admin/admin-shell";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Шинэ зөвлөгөө" };

export default async function NewGuidelinePage() {
  const categories = await prisma.category.findMany({
    where: { type: "GUIDELINE", status: "ACTIVE" },
    orderBy: { name: "asc" },
  });

  return (
    <AdminPageLayout>
      <h1 className="mb-6 text-2xl font-bold">Шинэ заавар, зөвлөгөө нэмэх</h1>
      <GuidelineForm categories={categories} />
    </AdminPageLayout>
  );
}
