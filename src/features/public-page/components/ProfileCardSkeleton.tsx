import { Skeleton } from "@/shared/components/shadcn/skeleton";

export const ProfileCardSkeleton = () => {
  return (
    <>
      <span role="status" className="sr-only">
        Loading user profile
      </span>

      <div
        aria-hidden="true"
        className="w-full bg-background rounded-3xl border border-border overflow-hidden shadow-sm mt-8 mb-6"
      >
        {/* Banner */}
        <Skeleton className="h-32 w-full rounded-none border-0" />

        {/* Body */}
        <div className="px-6 pb-6">
          {/* Avatar + pill */}
          <div className="relative -mt-10 mb-3 flex justify-between items-end">
            <Skeleton className="size-28 rounded-full border-4 border-background" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>

          {/* Name + username */}
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-3 w-24 mt-2" />

          {/* Role */}
          <Skeleton className="h-4 w-36 mt-3" />

          {/* Location */}
          <Skeleton className="h-4 w-28 mt-2" />

          {/* Bio */}
          <div className="mt-4 space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
          </div>
        </div>
      </div>
    </>
  );
};