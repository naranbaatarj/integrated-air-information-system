import { CoHomePreview } from "@/components/home/co-home-preview";
import { CoPublicDashboard } from "@/app/(site)/co-poisoning/co-public-dashboard";
import { PageHero } from "@/components/layout/site-chrome";
import { getCoPoisoningPublicData } from "@/lib/co-poisoning-public-data";
import { AlertTriangle } from "lucide-react";

export async function CoPoisoningPublicSection({
  variant = "page",
}: {
  variant?: "page" | "embedded";
}) {
  const { cases, deathCodes, options } = await getCoPoisoningPublicData();

  if (variant === "embedded") {
    return (
      <CoHomePreview cases={cases} deathCodes={deathCodes} options={options} />
    );
  }

  return (
    <>
      <PageHero
        title="Угаарын хийн хордлого"
        description="Бүртгэгдсэн тохиолдлын дэлгэрэнгүй статистик, шалтгаан, байршлын тойм болон урьдчилан сэргийлэх зөвлөмж"
      />

      <div className="border-b border-amber-200/70 bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50">
        <div className="mx-auto flex max-w-[1240px] items-start gap-3 px-4 py-3.5 sm:px-5">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-amber-950">
            Энэ хуудас нь{" "}
            <strong className="font-semibold">нэгтгэсэн статистик</strong> мэдээлэл
            харуулна. Хувь хүний хаяг, нэр зэрэг хувийн мэдээлэл нийтэд ил харагдахгүй.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] px-4 py-10 sm:px-5">
        <CoPublicDashboard cases={cases} deathCodes={deathCodes} options={options} />
      </div>
    </>
  );
}
