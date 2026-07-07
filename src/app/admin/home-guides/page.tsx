import Link from "next/link";
import { AdminPageLayout } from "@/components/admin/admin-shell";
import { prisma } from "@/lib/prisma";
import { HomeGuideDeleteButton } from "./home-guide-delete-button";

export const metadata = { title: "Нүүр хуудасны заавар" };

const statusLabels: Record<string, string> = {
  DRAFT: "Ноорог",
  PUBLISHED: "Нийтэлсэн",
  INACTIVE: "Идэвхгүй",
};

export default async function AdminHomeGuidesPage() {
  const guides = await prisma.homeGuide.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <AdminPageLayout>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Нүүр хуудасны заавар зөвлөгөө</h1>
          <p className="mt-1 text-sm text-slate-600">
            Нүүр хуудсан дахь видео заавар, accordion зөвлөмжүүдийг удирдах
          </p>
        </div>
        <Link
          href="/admin/home-guides/new"
          className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
        >
          + Шинэ заавар
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-600">
            <tr>
              <th className="px-4 py-3">Эрэмбэ</th>
              <th className="px-4 py-3">Асуулт</th>
              <th className="px-4 py-3">Видео</th>
              <th className="px-4 py-3">Төлөв</th>
              <th className="px-4 py-3">Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {guides.map((item) => (
              <tr key={item.id} className="border-t border-slate-100">
                <td className="px-4 py-3">{item.sortOrder}</td>
                <td className="px-4 py-3 font-medium">{item.question}</td>
                <td className="px-4 py-3">{item.videoUrl ? "Тийм" : "—"}</td>
                <td className="px-4 py-3">{statusLabels[item.status]}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/home-guides/${item.id}`}
                      className="text-sky-600 hover:underline"
                    >
                      Засах
                    </Link>
                    <HomeGuideDeleteButton id={item.id} question={item.question} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {guides.length === 0 && (
          <p className="p-6 text-sm text-slate-500">Заавар зөвлөгөө байхгүй байна.</p>
        )}
      </div>
    </AdminPageLayout>
  );
}
