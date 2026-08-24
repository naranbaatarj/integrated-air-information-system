import { AlertTriangle } from "lucide-react";
import { PageHero } from "@/components/layout/site-chrome";
import { prisma } from "@/lib/prisma";
import {
  groupOptionsByCategory,
  type CoPoisoningOptionDto,
} from "@/lib/co-poisoning-options";
import { toPublicCase } from "@/lib/co-poisoning-public";
import { CoPublicDashboard } from "./co-public-dashboard";

export const metadata = {
  title: "Угаарын хийн хордлого",
  description:
    "Угаарын хийн хордлогын статистик, шалтгаан, байршил болон урьдчилан сэргийлэх зөвлөмж",
};

export default async function CoPoisoningPublicPage() {
  const [records, optionRows] = await Promise.all([
    prisma.coPoisoningCase.findMany({
      select: {
        id: true,
        poisonedAt: true,
        age: true,
        gender: true,
        provinceName: true,
        provinceId: true,
        soumName: true,
        locationType: true,
        physicalCondition: true,
        outcome: true,
        cause: true,
      },
      orderBy: [{ poisonedAt: "desc" }],
    }),
    prisma.coPoisoningOption.findMany({
      where: { status: "ACTIVE" },
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }, { label: "asc" }],
    }),
  ]);

  const options = groupOptionsByCategory(optionRows as CoPoisoningOptionDto[]);
  const deathCodes = options.OUTCOME.filter(
    (o) => o.code != null && /нас барсан/i.test(o.label)
  ).map((o) => o.code!);

  if (deathCodes.length === 0) deathCodes.push(99);

  const cases = records.map(toPublicCase);

  return (
    <>
      <PageHero
        title="Угаарын хийн хордлого"
        description="Бүртгэгдсэн тохиолдлын дэлгэрэнгүй статистик, шалтгаан, байршлын тойм болон урьдчилан сэргийлэх зөвлөмж"
      />

      <div className="border-b border-amber-200/70 bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50">
        <div className="mx-auto flex max-w-7xl items-start gap-3 px-4 py-3.5 sm:px-6">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-sm leading-relaxed text-amber-950">
            Энэ хуудас нь{" "}
            <strong className="font-semibold">нэгтгэсэн статистик</strong>{" "}
            мэдээлэл харуулна. Хувь хүний хаяг, нэр зэрэг хувийн мэдээлэл нийтэд
            ил харагдахгүй.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <CoPublicDashboard
          cases={cases}
          deathCodes={deathCodes}
          options={options}
        />
      </div>
    </>
  );
}
