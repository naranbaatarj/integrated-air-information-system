import { NewsForm } from "../news-form";
import { AdminPageLayout } from "@/components/admin/admin-shell";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Шинэ мэдээ" };

export default async function NewNewsPage() {
  const categories = await prisma.category.findMany({
    where: { type: "NEWS", status: "ACTIVE" },
    orderBy: { name: "asc" },
  });

  return (
    <AdminPageLayout>
      <h1 className="mb-6 text-2xl font-bold">Шинэ мэдээ нэмэх</h1>
      <NewsForm categories={categories} />
    </AdminPageLayout>
  );
}
