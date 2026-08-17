import { Skeleton } from "@/shared/components/shadcn/skeleton";

export const AnalyticsSkeleton = () => {
  return (
    <>
      <span role="status" className="sr-only">
        Loading your analytics
      </span>

      {/* Stat cards */}
      <div aria-hidden="true" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-5 rounded-xl border border-border bg-background p-6 shadow-sm"
          >
            <Skeleton className="size-12 rounded-xl shrink-0" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        ))}
      </div>

      {/* Main chart */}
      <div
        aria-hidden="true"
        className="flex flex-col gap-3 rounded-xl border border-border bg-background p-5 shadow-sm"
      >
        <Skeleton className="h-5 w-56" />
        <Skeleton className="h-3 w-72" />
        <Skeleton className="h-55 w-full" />
      </div>

      {/* Small charts */}
      <div className="grid md:grid-cols-2 gap-3">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            aria-hidden="true"
            className="flex flex-col gap-3 rounded-xl border border-border bg-background p-5 shadow-sm"
          >
            <Skeleton className="h-5 w-44" />
            <Skeleton className="h-3 w-52" />
            <Skeleton className="h-55 w-full" />
          </div>
        ))}
      </div>
    </>
  );
};