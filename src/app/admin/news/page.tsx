import Link from "next/link";
import { AdminPageLayout } from "@/components/admin/admin-shell";
import { prisma } from "@/lib/prisma";
import { formatDateTime } from "@/lib/utils";

export const metadata = { title: "Мэдээ удирдах" };

const statusLabels: Record<string, string> = {
  DRAFT: "Ноорог",
  PUBLISHED: "Нийтэлсэн",
  INACTIVE: "Идэвхгүй",
};

export default async function AdminNewsPage() {
  const news = await prisma.news.findMany({
    include: { category: true, createdBy: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminPageLayout>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Мэдээ удирдах</h1>
        <div className="flex gap-2">
          <Link
            href="/admin/categories"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Ангилал удирдах
          </Link>
          <Link
            href="/admin/news/new"
            className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
          >
            + Шинэ мэдээ
          </Link>
        </div>
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
            {news.map((item) => (
              <tr key={item.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium">{item.title}</td>
                <td className="px-4 py-3">{item.category?.name ?? "—"}</td>
                <td className="px-4 py-3">{statusLabels[item.status]}</td>
                <td className="px-4 py-3">
                  {item.publishedAt ? formatDateTime(item.publishedAt) : "—"}
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/news/${item.id}`} className="text-sky-600 hover:underline">
                    Засах
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminPageLayout>
  );
}
