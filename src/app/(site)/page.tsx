import { AirQualityHero } from "@/components/home/air-quality-hero";
import { AudienceAdvice } from "@/components/home/audience-advice";
import { DistrictAqiOverview } from "@/components/home/district-aqi-overview";
import { LatestContent } from "@/components/home/latest-content";
import { OpenDataCta } from "@/components/home/open-data-cta";
import { QuickActions } from "@/components/home/quick-actions";
import { getAqiSnapshot, getDistrictStations } from "@/lib/aqi-service";
import { getLatestNews } from "@/lib/data";

export default async function HomePage() {
  const [snapshot, latestNews] = await Promise.all([
    getAqiSnapshot(),
    getLatestNews(4),
  ]);
  const stations = await getDistrictStations(snapshot);

  return (
    <>
      <AirQualityHero snapshot={snapshot} />
      <QuickActions />
      <DistrictAqiOverview stations={stations} />
      <AudienceAdvice />
      <LatestContent news={latestNews} />
      <OpenDataCta />
    </>
  );
}
