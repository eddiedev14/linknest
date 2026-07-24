import { Skeleton } from "@/shared/components/shadcn/skeleton";

export const LinksSkeleton = () => {
  return (
    <>
      <div className="flex items-center justify-between px-1 mb-1">
        <Skeleton className="h-4 w-14" />
        <Skeleton className="h-3 w-20" />
      </div>

      <ol className="flex flex-col gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <li key={index}>
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-4 shadow-sm">
              {/* Icon */}
              <Skeleton className="size-8 rounded-lg shrink-0" />

              {/* Text */}
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
};
