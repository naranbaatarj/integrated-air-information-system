import Link from "next/link";
import { ArrowRight, Dumbbell, Home, Users } from "lucide-react";

const adviceItems = [
  {
    href: "/guidelines",
    icon: Users,
    title: "Хүүхэд, өндөр настанд",
    description:
      "Гадаах хугацааг багасгаж, амьсгалын замын шинж тэмдгийг ажиглана. Сургууль, цэцэрлэгийн үйл ажиллагааг AQI-тай уялдуулна.",
    color: "text-cyan-700 bg-cyan-50",
    accent: "bg-cyan-100",
  },
  {
    href: "/guidelines",
    icon: Dumbbell,
    title: "Гадаа ажиллах, дасгал хийхэд",
    description:
      "Өндөр ачаалалтай дасгалыг хойшлуулж, хөдөлгөөн багатай цаг сонгоно. Заавал гарах бол стандартын маск хэрэглэнэ.",
    color: "text-blue-700 bg-blue-50",
    accent: "bg-blue-100",
  },
  {
    href: "/guidelines",
    icon: Home,
    title: "Гэр доторх агаарыг хамгаалах",
    description:
      "Цонхны завсар, агаар сэлгэлтийг зөв удирдаж, HEPA шүүлтүүр ашиглана. Тамхи болон дотоод шаталтаас зайлсхийнэ.",
    color: "text-emerald-700 bg-emerald-50",
    accent: "bg-emerald-100",
  },
];

export function AudienceAdvice() {
  return (
    <section className="bg-white px-4 py-16 sm:px-5 sm:py-[74px]" aria-labelledby="advice-title">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-1.5 text-[13px] font-extrabold uppercase tracking-wider text-cyan-700">
              Өнөөдөр юу хийх вэ?
            </p>
            <h2 id="advice-title" className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Танд тохирсон зөвлөмж
            </h2>
            <p className="mt-2 max-w-xl text-slate-600">
              Зөвлөмжийг нас, эрүүл мэндийн нөхцөл болон орчны агаарын чанарт нийцүүлэн
              богино, хэрэгжүүлэхэд хялбар байдлаар хүргэнэ.
            </p>
          </div>
          <Link
            href="/guidelines"
            className="inline-flex items-center gap-1.5 text-sm font-extrabold text-cyan-700"
          >
            Бүх зөвлөмж
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {adviceItems.map((item) => (
            <article
              key={item.title}
              className="relative min-h-[220px] overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div
                className={`absolute -right-16 -top-16 h-44 w-44 rounded-full ${item.accent}`}
                aria-hidden="true"
              />
              <div
                className={`relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}
              >
                <item.icon className="h-7 w-7" />
              </div>
              <h3 className="relative z-10 mt-6 text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="relative z-10 mt-2 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
              <Link
                href={item.href}
                className="relative z-10 mt-6 inline-flex text-[13px] font-extrabold text-cyan-700 hover:text-cyan-800"
              >
                Зөвлөмж унших →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
