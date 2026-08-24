import { AirQualityPageSkeleton } from "@/components/aqi/air-quality-skeleton";

export default function AirQualityLoading() {
  return (
    <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-5">
      <AirQualityPageSkeleton />
    </div>
  );
}
