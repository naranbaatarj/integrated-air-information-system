"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { CoPoisoningOptionCategory } from "@/generated/prisma/client";
import {
  CODED_OPTION_CATEGORIES,
  OPTION_CATEGORIES,
  OPTION_CATEGORY_LABELS,
  type CoPoisoningOptionDto,
} from "@/lib/co-poisoning-options";

export function CoPoisoningOptionsManager({
  initialOptions,
}: {
  initialOptions: CoPoisoningOptionDto[];
}) {
  const router = useRouter();
  const [options, setOptions] = useState(initialOptions);
  const [category, setCategory] = useState<CoPoisoningOptionCategory>("PHYSICAL_CONDITION");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [label, setLabel] = useState("");
  const [code, setCode] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">("ACTIVE");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isCoded = CODED_OPTION_CATEGORIES.includes(category);

  const filtered = useMemo(
    () => options.filter((o) => o.category === category),
    [options, category]
  );

  function resetForm() {
    setEditingId(null);
    setLabel("");
    setCode("");
    setSortOrder("");
    setStatus("ACTIVE");
    setError("");
  }

  function startEdit(option: CoPoisoningOptionDto) {
    setEditingId(option.id);
    setLabel(option.label);
    setCode(option.code?.toString() ?? "");
    setSortOrder(option.sortOrder.toString());
    setStatus(option.status);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      category,
      label,
      code: isCoded ? Number(code) : null,
      sortOrder: sortOrder.trim() ? Number(sortOrder) : undefined,
      status,
    };

    if (isCoded && !Number.isFinite(payload.code)) {
      setError("Код оруулна уу.");
      setLoading(false);
      return;
    }

    const res = await fetch(
      editingId
        ? `/api/admin/co-poisoning/options/${editingId}`
        : "/api/admin/co-poisoning/options",
      {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          editingId
            ? {
                label: payload.label,
                code: payload.code,
                sortOrder: payload.sortOrder,
                status: payload.status,
              }
            : payload
        ),
      }
    );

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Хадгалахад алдаа гарлаа.");
      return;
    }

    const saved = await res.json();
    setOptions((prev) => {
      if (editingId) {
        return prev
          .map((o) => (o.id === editingId ? { ...o, ...saved } : o))
          .sort((a, b) => a.sortOrder - b.sortOrder || a.label.localeCompare(b.label));
      }
      return [...prev, saved].sort(
        (a, b) => a.sortOrder - b.sortOrder || a.label.localeCompare(b.label)
      );
    });
    resetForm();
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Энэ утгыг устгах уу?")) return;
    setLoading(true);
    setError("");

    const res = await fetch(`/api/admin/co-poisoning/options/${id}`, {
      method: "DELETE",
    });
    setLoading(false);

    if (!res.ok) {
      setError("Устгахад алдаа гарлаа.");
      return;
    }

    setOptions((prev) => prev.filter((o) => o.id !== id));
    if (editingId === id) resetForm();
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {OPTION_CATEGORIES.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              setCategory(key);
              resetForm();
            }}
            className={
              category === key
                ? "rounded-full bg-slate-900 px-3 py-1.5 text-xs font-medium text-white"
                : "rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
            }
          >
            {OPTION_CATEGORY_LABELS[key]}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-slate-900">
            {editingId ? "Утга засах" : "Шинэ утга нэмэх"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {OPTION_CATEGORY_LABELS[category]}
          </p>

          {error && (
            <div className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {error}
            </div>
          )}

          <div className="mt-4 space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Нэр</label>
              <input
                required
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </div>

            {isCoded && (
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Код</label>
                <input
                  required
                  type="number"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  placeholder="ж: 1, 2, 99"
                />
              </div>
            )}

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Эрэмбэ</label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                placeholder="Автомат"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Төлөв</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "ACTIVE" | "INACTIVE")}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              >
                <option value="ACTIVE">Идэвхтэй</option>
                <option value="INACTIVE">Идэвхгүй</option>
              </select>
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Цуцлах
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 disabled:opacity-60"
            >
              <Plus className="h-4 w-4" />
              {editingId ? "Хадгалах" : "Нэмэх"}
            </button>
          </div>
        </form>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-slate-600">
              <tr>
                <th className="px-4 py-3">Эрэмбэ</th>
                {isCoded && <th className="px-4 py-3">Код</th>}
                <th className="px-4 py-3">Нэр</th>
                <th className="px-4 py-3">Төлөв</th>
                <th className="px-4 py-3">Үйлдэл</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={isCoded ? 5 : 4}
                    className="px-4 py-8 text-center text-slate-500"
                  >
                    Утга байхгүй
                  </td>
                </tr>
              ) : (
                filtered.map((option) => (
                  <tr key={option.id} className="border-t border-slate-100">
                    <td className="px-4 py-3">{option.sortOrder}</td>
                    {isCoded && <td className="px-4 py-3">{option.code ?? "—"}</td>}
                    <td className="px-4 py-3 font-medium">{option.label}</td>
                    <td className="px-4 py-3">
                      {option.status === "ACTIVE" ? "Идэвхтэй" : "Идэвхгүй"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => startEdit(option)}
                          className="rounded p-1.5 text-sky-600 hover:bg-sky-50"
                          title="Засах"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(option.id)}
                          className="rounded p-1.5 text-rose-600 hover:bg-rose-50"
                          title="Устгах"
                          disabled={loading}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
