import { AdminPageLayout } from "@/components/admin/admin-shell";
import { prisma } from "@/lib/prisma";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = { title: "Хэрэглэгч удирдах" };

const roleLabels: Record<string, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  EDITOR: "Editor",
};

export default async function AdminUsersPage() {
  const session = await auth();
  if (session?.user?.role !== "SUPER_ADMIN") redirect("/admin/dashboard");

  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <AdminPageLayout>
      <h1 className="mb-6 text-2xl font-bold">Хэрэглэгч удирдах</h1>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-600">
            <tr>
              <th className="px-4 py-3">Нэр</th>
              <th className="px-4 py-3">Нэвтрэх нэр</th>
              <th className="px-4 py-3">И-мэйл</th>
              <th className="px-4 py-3">Эрх</th>
              <th className="px-4 py-3">Төлөв</th>
              <th className="px-4 py-3">Бүртгэгдсэн</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium">{user.name}</td>
                <td className="px-4 py-3">{user.username}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{roleLabels[user.role]}</td>
                <td className="px-4 py-3">{user.status}</td>
                <td className="px-4 py-3">{formatDateTime(user.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminPageLayout>
  );
}
