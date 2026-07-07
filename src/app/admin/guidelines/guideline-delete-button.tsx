"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";

export function GuidelineDeleteButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`"${title}" зөвлөгөөг устгах уу?`)) return;

    setLoading(true);
    const res = await fetch(`/api/admin/guidelines/${id}`, { method: "DELETE" });
    setLoading(false);

    if (!res.ok) {
      alert("Устгахад алдаа гарлаа.");
      return;
    }

    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="inline-flex items-center gap-1 text-red-600 hover:underline disabled:opacity-60"
    >
      <Trash2 className="h-3.5 w-3.5" />
      {loading ? "Устгаж байна..." : "Устгах"}
    </button>
  );
}
