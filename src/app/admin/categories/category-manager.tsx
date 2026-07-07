"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";

type Category = {
  id: string;
  name: string;
  slug: string;
  status: "ACTIVE" | "INACTIVE";
  _count?: { news: number };
};

export function CategoryManager({ initialCategories }: { initialCategories: Category[] }) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">("ACTIVE");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, status }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Ангилал нэмэхэд алдаа гарлаа.");
      return;
    }

    setName("");
    setStatus("ACTIVE");
    router.refresh();
    const created = await res.json();
    setCategories((prev) => [...prev, { ...created, _count: { news: 0 } }].sort((a, b) => a.name.localeCompare(b.name)));
  }

  async function handleUpdate(id: string, data: { name: string; status: "ACTIVE" | "INACTIVE" }) {
    setLoading(true);
    setError("");

    const res = await fetch(`/api/admin/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Хадгалахад алдаа гарлаа.");
      return;
    }

    const updated = await res.json();
    setCategories((prev) =>
      prev
        .map((cat) => (cat.id === id ? { ...cat, ...updated, _count: cat._count } : cat))
        .sort((a, b) => a.name.localeCompare(b.name))
    );
    setEditingId(null);
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Энэ ангиллыг устгах уу?")) return;

    setLoading(true);
    setError("");

    const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Устгахад алдаа гарлаа.");
      return;
    }

    setCategories((prev) => prev.filter((cat) => cat.id !== id));
    router.refresh();
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleCreate} className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">Шинэ ангилал нэмэх</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Ангиллын нэр</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Жишээ: Агаарын чанар"
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Төлөв</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "ACTIVE" | "INACTIVE")}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            >
              <option value="ACTIVE">Идэвхтэй</option>
              <option value="INACTIVE">Идэвхгүй</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-4 rounded-lg bg-sky-600 px-5 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          Нэмэх
        </button>
      </form>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-600">
            <tr>
              <th className="px-4 py-3">Нэр</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Мэдээний тоо</th>
              <th className="px-4 py-3">Төлөв</th>
              <th className="px-4 py-3">Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) =>
              editingId === cat.id ? (
                <CategoryEditRow
                  key={cat.id}
                  category={cat}
                  loading={loading}
                  onSave={(data) => handleUpdate(cat.id, data)}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <tr key={cat.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium">{cat.name}</td>
                  <td className="px-4 py-3 text-slate-500">{cat.slug}</td>
                  <td className="px-4 py-3">{cat._count?.news ?? 0}</td>
                  <td className="px-4 py-3">
                    {cat.status === "ACTIVE" ? "Идэвхтэй" : "Идэвхгүй"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingId(cat.id)}
                        className="inline-flex items-center gap-1 text-sky-600 hover:underline"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Засах
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(cat.id)}
                        className="inline-flex items-center gap-1 text-red-600 hover:underline"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Устгах
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        {categories.length === 0 && (
          <p className="p-6 text-sm text-slate-500">Ангилал байхгүй байна.</p>
        )}
      </div>
    </div>
  );
}

function CategoryEditRow({
  category,
  loading,
  onSave,
  onCancel,
}: {
  category: Category;
  loading: boolean;
  onSave: (data: { name: string; status: "ACTIVE" | "INACTIVE" }) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(category.name);
  const [status, setStatus] = useState(category.status);

  return (
    <tr className="border-t border-slate-100 bg-sky-50/50">
      <td className="px-4 py-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border px-2 py-1 text-sm"
        />
      </td>
      <td className="px-4 py-3 text-slate-500">{category.slug}</td>
      <td className="px-4 py-3">{category._count?.news ?? 0}</td>
      <td className="px-4 py-3">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "ACTIVE" | "INACTIVE")}
          className="rounded border px-2 py-1 text-sm"
        >
          <option value="ACTIVE">Идэвхтэй</option>
          <option value="INACTIVE">Идэвхгүй</option>
        </select>
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <button
            type="button"
            disabled={loading}
            onClick={() => onSave({ name, status })}
            className="text-sm font-medium text-sky-600 hover:underline disabled:opacity-60"
          >
            Хадгалах
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-1 text-sm text-slate-600 hover:underline"
          >
            <X className="h-3.5 w-3.5" />
            Болих
          </button>
        </div>
      </td>
    </tr>
  );
}
