import { Skeleton } from "@/components/ui/skeleton";

export default function SiteLoading() {
  return (
    <div className="px-4 py-10 sm:px-5" role="status" aria-live="polite">
      <span className="sr-only">Хуудас ачаалж байна</span>
      <div className="mx-auto max-w-[1240px] space-y-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-16 w-full max-w-lg" />
            <Skeleton className="h-24 w-full max-w-xl" />
            <div className="flex gap-3">
              <Skeleton className="h-11 w-44" />
              <Skeleton className="h-11 w-44" />
            </div>
          </div>
          <Skeleton className="h-96 w-full rounded-[28px]" />
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-[17px]" />
          ))}
        </div>
      </div>
    </div>
  );
}
