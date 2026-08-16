import { useAuth } from "@/features/auth/hooks/useAuth";
import { getUserBannerProps } from "@/shared/utils/userBanner.helper";
import { SEO } from "@/shared/components/SEO";
import { UserBanner } from "@/shared/components/app/user/UserBanner";
import { BannerDialog } from "@/features/profile/components/dialogs/banner/BannerDialog";
import { UserAvatar } from "@/shared/components/app/user/UserAvatar";
import { AvatarDialog } from "@/features/profile/components/dialogs/avatar/AvatarDialog";
import { ProfileForm } from "@/features/profile/components/ProfileForm";

const Profile = () => {
  const { user } = useAuth();
  const { bannerClassname, bannerCSS } = getUserBannerProps(user?.bannerStyle);

  return (
    <>
      <SEO
        title="My Profile"
        description="Customize your LinkNest profile, update your professional information, and personalize how your public page appears online."
        path="/profile"
        noIndex
      />

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
                  <UserAvatar avatarURL={user?.avatar.url} username={user?.username} />
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
    </>
  );
};

export default Profile;
