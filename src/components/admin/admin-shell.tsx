import Link from "next/link";
import {
  LayoutDashboard,
  Newspaper,
  BookOpen,
  Wind,
  Users,
  Mail,
  LogOut,
  Settings,
  Tags,
  Video,
} from "lucide-react";
import { auth, signOut } from "@/lib/auth";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/news", label: "Мэдээ", icon: Newspaper },
  { href: "/admin/categories", label: "Ангилал", icon: Tags },
  { href: "/admin/guidelines", label: "Зөвлөгөө", icon: BookOpen },
  { href: "/admin/home-guides", label: "Нүүр заавар", icon: Video },
  { href: "/admin/air-quality", label: "Агаарын чанар", icon: Wind },
  { href: "/admin/contact-messages", label: "Холбоо барих", icon: Mail },
  { href: "/admin/users", label: "Хэрэглэгч", icon: Users, superAdminOnly: true },
];

export async function AdminSidebar() {
  const session = await auth();
  const role = session?.user?.role;

  return (
    <aside className="flex w-64 flex-col border-r border-slate-200 bg-slate-900 text-slate-200">
      <div className="border-b border-slate-800 px-5 py-4">
        <Link href="/admin/dashboard" className="text-lg font-semibold text-white">
          Агаар Admin
        </Link>
        <p className="mt-1 text-xs text-slate-400">{session?.user?.name}</p>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {navItems
          .filter((item) => !item.superAdminOnly || role === "SUPER_ADMIN")
          .map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-slate-800 hover:text-white"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
      </nav>
      <div className="space-y-1 border-t border-slate-800 p-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-slate-800"
        >
          <Settings className="h-4 w-4" />
          Вебсайт харах
        </Link>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/admin/login" });
          }}
        >
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-slate-800"
          >
            <LogOut className="h-4 w-4" />
            Гарах
          </button>
        </form>
      </div>
    </aside>
  );
}

export async function AdminPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-slate-100">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
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
