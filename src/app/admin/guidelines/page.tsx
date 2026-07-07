import Link from "next/link";
import { AdminPageLayout } from "@/components/admin/admin-shell";
import { prisma } from "@/lib/prisma";
import { formatDateTime } from "@/lib/utils";
import { GuidelineDeleteButton } from "./guideline-delete-button";

export const metadata = { title: "Зөвлөгөө удирдах" };

const statusLabels: Record<string, string> = {
  DRAFT: "Ноорог",
  PUBLISHED: "Нийтэлсэн",
  INACTIVE: "Идэвхгүй",
};

export default async function AdminGuidelinesPage() {
  const guidelines = await prisma.guideline.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminPageLayout>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Заавар, зөвлөгөө</h1>
          <p className="mt-1 text-sm text-slate-600">Заавар, зөвлөгөө нэмэх, засах, устгах</p>
        </div>
        <Link
          href="/admin/guidelines/new"
          className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
        >
          + Шинэ зөвлөгөө
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-600">
            <tr>
              <th className="px-4 py-3">Гарчиг</th>
              <th className="px-4 py-3">Ангилал</th>
              <th className="px-4 py-3">Төлөв</th>
              <th className="px-4 py-3">Нийтэлсэн</th>
              <th className="px-4 py-3">Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {guidelines.map((item) => (
              <tr key={item.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium">{item.title}</td>
                <td className="px-4 py-3">{item.category?.name ?? "—"}</td>
                <td className="px-4 py-3">{statusLabels[item.status]}</td>
                <td className="px-4 py-3">
                  {item.publishedAt ? formatDateTime(item.publishedAt) : "—"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/guidelines/${item.id}`}
                      className="text-sky-600 hover:underline"
                    >
                      Засах
                    </Link>
                    <GuidelineDeleteButton id={item.id} title={item.title} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {guidelines.length === 0 && (
          <p className="p-6 text-sm text-slate-500">Заавар, зөвлөгөө байхгүй байна.</p>
        )}
      </div>
    </AdminPageLayout>
  );
}
