import { Button } from "@/shared/components/shadcn/button";
import { cn } from "@/lib/utils";

import { FaCamera, FaPencil } from "react-icons/fa6";
import AnonymousProfile from "@/assets/anonymous.png";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { ProfileForm } from "@/features/profile/components/ProfileForm";

export function Profile() {
  const { user } = useAuth();

  return (
    <main
      className="flex-1 flex flex-col items-center py-10 px-4"
      aria-label="Edit your profile"
    >
      <div className="w-full max-w-2xl flex flex-col gap-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground tracking-tight">
            Your Profile
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            This information will appear on your public link page.
          </p>
        </div>

        {/* Profile card */}
        <div className="bg-background rounded-2xl border border-border overflow-hidden shadow-sm">
          <div
            className={cn("relative h-32 w-full", user?.bannerStyle)}
            role="img"
            aria-label="Profile banner"
          >
            <Button
              type="button"
              className="absolute top-3 right-3 size-8 rounded-lg bg-black/20 hover:bg-black/35 flex items-center justify-center text-white transition-colors backdrop-blur-sm"
              aria-label="Edit banner color"
            >
              <FaPencil size={12} aria-hidden="true" />
            </Button>

            <div className="absolute left-1/2 -translate-x-1/2 -bottom-10">
              <div className="relative">
                <div
                  className="size-28 rounded-full border-4 border-background bg-muted flex items-center justify-center overflow-hidden shadow-md"
                  aria-label="Profile photo"
                >
                  <img
                    src={AnonymousProfile}
                    className="object-cover"
                    alt="Your profile image"
                  />
                </div>

                <Button
                  type="button"
                  className="absolute bottom-1 right-1 size-8 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center text-primary-foreground shadow-sm transition-colors ring-2 ring-background"
                  aria-label="Change profile photo"
                >
                  <FaCamera size={11} aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>

          {/* Form area */}
          <div className="px-6 pt-14 pb-8">
            <ProfileForm />
          </div>
        </div>
      </div>
    </main>
  );
}
