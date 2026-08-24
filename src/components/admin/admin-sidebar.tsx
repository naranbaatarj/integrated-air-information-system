"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  BookOpen,
  Wind,
  Users,
  Mail,
  LogOut,
  Tags,
  Video,
  Activity,
  PanelLeftClose,
  PanelLeft,
  ExternalLink,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { adminSignOut } from "@/lib/admin-actions";

const STORAGE_KEY = "agaar-admin-sidebar-collapsed";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/news", label: "Мэдээ", icon: Newspaper },
  { href: "/admin/categories", label: "Ангилал", icon: Tags },
  { href: "/admin/guidelines", label: "Зөвлөгөө", icon: BookOpen },
  { href: "/admin/home-guides", label: "Нүүр заавар", icon: Video },
  { href: "/admin/air-quality", label: "Агаарын чанар", icon: Wind },
  { href: "/admin/co-poisoning", label: "Угаарын хий", icon: Activity, exact: true },
  {
    href: "/admin/co-poisoning/options",
    label: "Угаарын тохиргоо",
    icon: SlidersHorizontal,
  },
  { href: "/admin/contact-messages", label: "Холбоо барих", icon: Mail },
  { href: "/admin/users", label: "Хэрэглэгч", icon: Users, superAdminOnly: true },
];

export function AdminSidebarClient({
  userName,
  role,
}: {
  userName?: string | null;
  role?: string | null;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "1") setCollapsed(true);
  }, []);

  function toggle() {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      return next;
    });
  }

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    if (href === "/admin/dashboard") return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const items = navItems.filter(
    (item) => !item.superAdminOnly || role === "SUPER_ADMIN"
  );

  return (
    <aside
      className={cn(
        "sticky top-0 flex h-screen flex-col border-r border-slate-800 bg-slate-900 text-slate-200 transition-[width] duration-200",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      <div
        className={cn(
          "flex border-b border-slate-800",
          collapsed ? "flex-col items-center gap-2 px-2 py-3" : "items-start justify-between gap-2 px-4 py-4"
        )}
      >
        <Link
          href="/admin/dashboard"
          className={cn("min-w-0", collapsed ? "text-center" : "")}
          title="Агаар Admin"
        >
          {collapsed ? (
            <span className="text-sm font-bold text-white">А</span>
          ) : (
            <>
              <span className="block text-lg font-semibold text-white">Агаар Admin</span>
              {userName && (
                <span className="mt-1 block truncate text-xs text-slate-400">{userName}</span>
              )}
            </>
          )}
        </Link>
        <button
          type="button"
          onClick={toggle}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          title={collapsed ? "Sidebar нээх" : "Sidebar хураах"}
          aria-label={collapsed ? "Sidebar нээх" : "Sidebar хураах"}
        >
          {collapsed ? (
            <PanelLeft className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-2">
        {items.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(href, exact);
          return (
            <Link
              key={href}
              href={href}
              title={label}
              className={cn(
                "flex items-center rounded-lg text-sm transition-colors",
                collapsed ? "justify-center px-2 py-2.5" : "gap-2 px-3 py-2",
                active
                  ? "bg-slate-800 text-white"
                  : "hover:bg-slate-800 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span className="truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-slate-800 p-2">
        <Link
          href="/"
          title="Вебсайт харах"
          className={cn(
            "flex items-center rounded-lg text-sm hover:bg-slate-800",
            collapsed ? "justify-center px-2 py-2.5" : "gap-2 px-3 py-2"
          )}
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Вебсайт харах</span>}
        </Link>
        <form action={adminSignOut}>
          <button
            type="submit"
            title="Гарах"
            className={cn(
              "flex w-full items-center rounded-lg text-sm hover:bg-slate-800",
              collapsed ? "justify-center px-2 py-2.5" : "gap-2 px-3 py-2"
            )}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Гарах</span>}
          </button>
        </form>
      </div>
    </aside>
  );
}
