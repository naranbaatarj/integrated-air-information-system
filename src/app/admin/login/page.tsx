"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Wind } from "lucide-react";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Нэвтрэх нэр эсвэл нууц үг буруу байна.");
      return;
    }

    window.location.href = "/admin/dashboard";
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-sky-900 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 flex items-center gap-2 text-sky-700">
          <Wind className="h-8 w-8" />
          <span className="text-xl font-bold">Агаар Admin</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Нэвтрэх</h1>
        <p className="mt-1 text-sm text-slate-600">Админ хэсэгт нэвтрэх</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="username" className="mb-1 block text-sm font-medium">
              Нэвтрэх нэр / И-мэйл
            </label>
            <input
              id="username"
              name="username"
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">
              Нууц үг
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-500"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-sky-600 py-2.5 font-medium text-white hover:bg-sky-700 disabled:opacity-60"
          >
            {loading ? "Нэвтэрч байна..." : "Нэвтрэх"}
          </button>
        </form>
      </div>
    </div>
  );
}
