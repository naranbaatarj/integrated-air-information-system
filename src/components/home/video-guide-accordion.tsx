"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { getVideoEmbed } from "@/lib/video-embed";

export type HomeGuideItem = {
  id: string;
  question: string;
  content: string;
  videoUrl: string | null;
  linkUrl: string | null;
  linkLabel: string | null;
};

function VideoPlayer({ url }: { url: string }) {
  const embed = getVideoEmbed(url);

  if (!embed) {
    return (
      <p className="text-sm text-slate-500">
        Видео холбоос буруу байна. YouTube, Vimeo эсвэл MP4 холбоос оруулна уу.
      </p>
    );
  }

  if (embed.type === "direct") {
    return (
      <video
        src={embed.embedUrl}
        controls
        className="aspect-video w-full rounded-lg bg-black"
        preload="metadata"
      />
    );
  }

  return (
    <div className="aspect-video overflow-hidden rounded-lg bg-black">
      <iframe
        src={embed.embedUrl}
        title="Заавар видео"
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export function VideoGuideAccordion({ items }: { items: HomeGuideItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  if (items.length === 0) return null;

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className={`overflow-hidden rounded-xl border transition-colors ${
              isOpen
                ? "border-sky-200 bg-white shadow-sm"
                : "border-sky-100 bg-sky-50/60 hover:bg-sky-50"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-base font-medium text-slate-800">{item.question}</span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  isOpen ? "bg-sky-600 text-white" : "bg-emerald-500 text-white"
                }`}
              >
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>

            {isOpen && (
              <div className="border-t border-sky-100 px-5 pb-5 pt-4">
                {item.videoUrl && (
                  <div className="mb-4">
                    <VideoPlayer url={item.videoUrl} />
                  </div>
                )}
                {item.content && (
                  <div
                    className="prose-content text-sm leading-relaxed text-slate-700"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                )}
                {item.linkUrl && (
                  <a
                    href={item.linkUrl}
                    target={item.linkUrl.startsWith("http") ? "_blank" : undefined}
                    rel={item.linkUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="mt-3 inline-block text-sm font-medium text-sky-600 hover:underline"
                  >
                    {item.linkLabel ?? "Дэлгэрэнгүй заавар харах"}
                  </a>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
