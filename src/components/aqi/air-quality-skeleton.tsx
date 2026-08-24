import { Skeleton } from "@/components/ui/skeleton";

export function AirQualityPageSkeleton() {
  return (
    <div className="space-y-8" role="status" aria-live="polite">
      <span className="sr-only">Агаарын чанарын мэдээлэл ачаалж байна</span>
      <div className="flex justify-between gap-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-11 w-56" />
      </div>
      <Skeleton className="h-80 w-full rounded-[28px]" />
      <Skeleton className="h-64 w-full rounded-2xl" />
      <Skeleton className="h-48 w-full rounded-2xl" />
    </div>
  );
}
