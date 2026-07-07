import { AdminPageLayout } from "@/components/admin/admin-shell";
import { CategoryManager } from "./category-manager";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Мэдээний ангилал" };

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    where: { type: "NEWS" },
    include: { _count: { select: { news: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <AdminPageLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Мэдээний ангилал</h1>
        <p className="mt-1 text-sm text-slate-600">
          Мэдээний ангилал нэмэх, засах, устгах
        </p>
      </div>
      <CategoryManager initialCategories={categories} />
    </AdminPageLayout>
  );
}
