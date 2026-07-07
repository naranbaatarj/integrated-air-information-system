import { AdminPageLayout } from "@/components/admin/admin-shell";
import { prisma } from "@/lib/prisma";
import { formatDateTime } from "@/lib/utils";

export const metadata = { title: "Холбоо барих мессеж" };

const statusLabels: Record<string, string> = {
  NEW: "Шинэ",
  READ: "Уншсан",
  REPLIED: "Хариулсан",
};

export default async function AdminContactMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminPageLayout>
      <h1 className="mb-6 text-2xl font-bold">Холбоо барих мессежүүд</h1>
      <div className="space-y-4">
        {messages.map((msg) => (
          <article key={msg.id} className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h2 className="font-semibold">{msg.subject}</h2>
                <p className="mt-1 text-sm text-slate-600">
                  {msg.name} · {msg.email} {msg.phone && `· ${msg.phone}`}
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs">
                {statusLabels[msg.status]}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{msg.message}</p>
            <p className="mt-2 text-xs text-slate-500">{formatDateTime(msg.createdAt)}</p>
          </article>
        ))}
        {messages.length === 0 && (
          <p className="text-sm text-slate-500">Мессеж байхгүй байна.</p>
        )}
      </div>
    </AdminPageLayout>
  );
}
