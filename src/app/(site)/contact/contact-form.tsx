"use client";

import { useState } from "react";
import { PageHero } from "@/components/layout/site-chrome";

type ContactInfo = {
  organization: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapUrl: string;
};

export function ContactForm({ contactInfo }: { contactInfo: ContactInfo }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });

      if (!res.ok) throw new Error("failed");
      setStatus("success");
      setMessage("Таны мессеж амжилттай илгээгдлээ.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Илгээхэд алдаа гарлаа. Дахин оролдоно уу.");
    }
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
      <div className="space-y-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold">{contactInfo.organization}</h2>
          <dl className="mt-4 space-y-3 text-sm text-slate-700">
            <div>
              <dt className="font-medium text-slate-900">Хаяг</dt>
              <dd>{contactInfo.address}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-900">Утас</dt>
              <dd>{contactInfo.phone}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-900">И-мэйл</dt>
              <dd>{contactInfo.email}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-900">Ажиллах цаг</dt>
              <dd>{contactInfo.hours}</dd>
            </div>
          </dl>
        </div>
        <a
          href={contactInfo.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
        >
          Google Map дээр харах
        </a>
      </div>

      <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">Холбоо барих маягт</h2>
        <div className="space-y-4">
          <Field label="Нэр" name="name" required />
          <Field label="Утас" name="phone" />
          <Field label="И-мэйл" name="email" type="email" required />
          <Field label="Гарчиг" name="subject" required />
          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-medium">
              Санал хүсэлт, асуулт
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500"
            />
          </div>
          {message && (
            <p className={`text-sm ${status === "error" ? "text-red-600" : "text-green-600"}`}>
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-700 disabled:opacity-60"
          >
            {status === "loading" ? "Илгээж байна..." : "Илгээх"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500"
      />
    </div>
  );
}

export function ContactPageShell({ contactInfo }: { contactInfo: ContactInfo }) {
  return (
    <>
      <PageHero title="Холбоо барих" description="Бидэнтэй холбогдох мэдээлэл, санал хүсэлт илгээх" />
      <ContactForm contactInfo={contactInfo} />
    </>
  );
}
