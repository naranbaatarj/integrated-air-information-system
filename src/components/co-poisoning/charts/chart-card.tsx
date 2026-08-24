"use client";

import { useCallback, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";

export function useChartDownload(filename: string) {
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const download = useCallback(async () => {
    if (!ref.current) return;
    setLoading(true);
    try {
      const canvas = await html2canvas(ref.current, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
      });
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = filename.endsWith(".png") ? filename : `${filename}.png`;
      a.click();
    } finally {
      setLoading(false);
    }
  }, [filename]);

  return { ref, download, loading };
}

export function DownloadImageButton({
  onClick,
  loading,
}: {
  onClick: () => void;
  loading?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-60"
    >
      <Download className="h-3.5 w-3.5" />
      {loading ? "Татаж байна..." : "Зураг татах"}
    </button>
  );
}

export function ChartCard({
  title,
  subtitle,
  children,
  filename,
  actions,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  filename: string;
  actions?: React.ReactNode;
}) {
  const { ref, download, loading } = useChartDownload(filename);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {actions}
          <DownloadImageButton onClick={download} loading={loading} />
        </div>
      </div>
      <div ref={ref} className="bg-white">
        {children}
      </div>
    </div>
  );
}
