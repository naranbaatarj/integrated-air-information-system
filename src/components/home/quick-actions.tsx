import Link from "next/link";
import { Activity, ChevronRight, Database, FileText, MessageSquare } from "lucide-react";

const actions = [
  {
    href: "/air-quality",
    icon: Activity,
    title: "Түүхэн мэдээлэл",
    description: "Өдөр, сараар харьцуулах",
    color: "text-cyan-700 bg-cyan-50",
  },
  {
    href: "/guidelines",
    icon: FileText,
    title: "Заавар, зөвлөгөө",
    description: "Эрүүл мэндээ хамгаалах",
    color: "text-blue-700 bg-blue-50",
  },
  {
    href: "/open-info",
    icon: Database,
    title: "Нээлттэй өгөгдөл",
    description: "CSV, Excel татаж авах",
    color: "text-emerald-700 bg-emerald-50",
  },
  {
    href: "/contact",
    icon: MessageSquare,
    title: "Санал хүсэлт",
    description: "Асуулт, мэдээлэл илгээх",
    color: "text-orange-700 bg-orange-50",
  },
];

export function QuickActions() {
  return (
    <section className="border-b border-slate-200 bg-white py-4" aria-label="Хурдан холбоос">
      <div className="mx-auto grid max-w-[1240px] gap-2 px-4 sm:grid-cols-2 sm:px-5 lg:grid-cols-4">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="group flex min-h-[78px] items-center gap-3 rounded-[17px] border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-sm"
          >
            <span
              className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] ${action.color}`}
            >
              <action.icon className="h-6 w-6" />
            </span>
            <span className="min-w-0 flex-1">
              <strong className="block text-sm text-slate-900">{action.title}</strong>
              <small className="block text-xs text-slate-500">{action.description}</small>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </section>
  );
}
