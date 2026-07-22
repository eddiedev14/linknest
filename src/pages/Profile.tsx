import { Image } from "@imagekit/react";
import AnonymousProfile from "@/assets/anonymous.png";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getUserBannerProps } from "@/shared/utils/userBanner.helper";
import { UserBanner } from "@/shared/components/app/user/UserBanner";
import { BannerDialog } from "@/features/profile/components/dialogs/banner/BannerDialog";
import { AvatarDialog } from "@/features/profile/components/dialogs/avatar/AvatarDialog";
import { ProfileForm } from "@/features/profile/components/ProfileForm";

export function Profile() {
  const { user } = useAuth();
  const { bannerClassname, bannerCSS } = getUserBannerProps(user?.bannerStyle);
  const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

  return (
    <main className="flex-1 flex flex-col items-center py-10 px-4" aria-label="Edit your profile">
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
          <UserBanner className={bannerClassname} style={bannerCSS}>
            <BannerDialog />

            <div className="absolute left-1/2 -translate-x-1/2 -bottom-10">
              <div className="relative">
                <div
                  className="size-28 rounded-full border-4 border-background bg-muted flex items-center justify-center overflow-hidden shadow-md"
                  aria-label="Profile photo"
                >
                  {user?.avatar.url ? (
                    <Image
                      urlEndpoint={urlEndpoint}
                      src={user.avatar.url}
                      transformation={[
                        {
                          width: 300,
                          height: 300,
                          crop: "maintain_ratio",
                          quality: 80,
                          format: "webp",
                        },
                      ]}
                      loading="lazy"
                      alt={`${user.username}'s profile`}
                    />
                  ) : (
                    <img src={AnonymousProfile} className="object-cover" alt="Default profile" />
                  )}
                </div>

                <AvatarDialog />
              </div>
            </div>
          </UserBanner>

          {/* Form area */}
          <div className="px-6 pt-14 pb-8">
            <ProfileForm />
          </div>
        </div>
      </div>
    </main>
  );
}
