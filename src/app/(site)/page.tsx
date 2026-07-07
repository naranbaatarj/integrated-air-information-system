import Link from "next/link";
import { Shield, Newspaper } from "lucide-react";
import { AqiCard } from "@/components/aqi/aqi-display";
import { ContentCard } from "@/components/layout/site-chrome";
import { VideoGuideAccordion } from "@/components/home/video-guide-accordion";
import { formatDate } from "@/lib/utils";
import { getLatestNews, getPublishedHomeGuides, getPublishedServices, getTodayAirQuality } from "@/lib/data";

export default async function HomePage() {
  const [todayAqi, latestNews, services, homeGuides] = await Promise.all([
    getTodayAirQuality(),
    getLatestNews(3),
    getPublishedServices(),
    getPublishedHomeGuides(),
  ]);

  return (
    <>
      <section className="bg-gradient-to-br from-sky-700 via-sky-600 to-cyan-600 px-4 py-16 text-white sm:px-6">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm">
              <Shield className="h-4 w-4" />
              Утаанаас хамгаалах, урьдчилан сэргийлэх
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Агаарын чанар, утаанаас сэргийлэх мэдээллийг нэг дороос
            </h1>
            <p className="mt-4 max-w-xl text-lg text-sky-50">
              Өдөр бүрийн агаарын чанарын индекс, зөвлөмж, мэдээ, үйлчилгээний мэдээллийг
              иргэдэд ойлгомжтой хүргэнэ.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/air-quality"
                className="rounded-lg bg-white px-5 py-2.5 font-medium text-sky-700 hover:bg-sky-50"
              >
                Агаарын чанар харах
              </Link>
              <Link
                href="/guidelines"
                className="rounded-lg border border-white/40 px-5 py-2.5 font-medium hover:bg-white/10"
              >
                Зөвлөмж унших
              </Link>
            </div>
          </div>
          {todayAqi ? (
            <AqiCard
              aqi={todayAqi.aqi}
              level={todayAqi.status}
              location={todayAqi.location}
              date={formatDate(todayAqi.date)}
              pm25={todayAqi.pm25}
              pm10={todayAqi.pm10}
              temperature={todayAqi.temperature}
              humidity={todayAqi.humidity}
              recommendation={todayAqi.recommendation}
            />
          ) : (
            <div className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur">
              <p className="text-lg">Өнөөдрийн агаарын чанарын мэдээлэл одоогоор байхгүй байна.</p>
              <Link href="/air-quality" className="mt-4 inline-block underline">
                Түүхэн мэдээлэл харах
              </Link>
            </div>
          )}
        </div>
      </section>

      {homeGuides.length > 0 && (
        <section className="bg-white px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-3xl font-bold text-sky-700">Заавар зөвлөгөө</h2>
            <VideoGuideAccordion items={homeGuides} />
          </div>
        </section>
      )}

      <section className="bg-white px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Newspaper className="h-5 w-5 text-sky-600" />
              <h2 className="text-2xl font-bold">Сүүлийн мэдээ</h2>
            </div>
            <Link href="/news" className="text-sm font-medium text-sky-700 hover:underline">
              Бүх мэдээ →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestNews.map((item) => (
              <ContentCard
                key={item.id}
                title={item.title}
                summary={item.summary}
                href={`/news/${item.slug}`}
                date={item.publishedAt ? formatDate(item.publishedAt) : undefined}
                category={item.category?.name}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="mb-6 text-2xl font-bold">Үйлчилгээ</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {services.slice(0, 4).map((service) => (
            <ContentCard
              key={service.id}
              title={service.title}
              summary={service.summary}
              href={`/services#${service.slug}`}
            />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/contact"
            className="inline-flex rounded-lg bg-sky-600 px-6 py-3 font-medium text-white hover:bg-sky-700"
          >
            Холбоо барих
          </Link>
        </div>
      </section>
    </>
  );
}
