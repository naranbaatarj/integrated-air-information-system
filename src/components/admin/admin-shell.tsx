import { auth } from "@/lib/auth";
import { AdminSidebarClient } from "@/components/admin/admin-sidebar";

export async function AdminSidebar() {
  const session = await auth();

  return (
    <AdminSidebarClient
      userName={session?.user?.name}
      role={session?.user?.role}
    />
  );
}

export async function AdminPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-slate-100">
      <AdminSidebar />
      <div className="min-w-0 flex-1 overflow-auto">
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export function AdminStatCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
      {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
    </div>
  );
}
