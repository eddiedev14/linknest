import { Navigate } from "react-router-dom";
import { SEO } from "@/shared/components/SEO";
import { FooterAttribution } from "@/shared/components/app/FooterAttribution";
import { usePublicPage } from "@/features/public-page/hooks/usePublicPage";
import { ProfileCard } from "@/features/public-page/components/ProfileCard";
import { ProfileCardSkeleton } from "@/features/public-page/components/ProfileCardSkeleton";
import { ProfileLinks } from "@/features/public-page/components/ProfileLinks";

const PublicPage = () => {
  const {
    username,
    userProfile,
    links,
    loading,
    loadingLinks,
    bannerClassname,
    bannerCSS,
    metaDescription,
    personJSONLD,
    onLinkClick,
  } = usePublicPage();

  if (!userProfile && !loading) return <Navigate to="/404" replace />;

  return (
    <>
      {userProfile && (
        <SEO
          title={`${userProfile.displayName} (@${userProfile.username})`}
          description={metaDescription}
          path={`/u/${userProfile.username}`}
          image={userProfile.avatar?.url}
        />
      )}
      {userProfile && (
        <script type="application/ld+json">{JSON.stringify(personJSONLD)}</script>
      )}

      <div className="min-h-screen bg-muted/30 flex flex-col items-center">
        <main
          className="w-full max-w-xl px-5 pb-20 flex flex-col items-center"
          aria-label={`${username}'s public profile`}
        >
          {userProfile ? (
            <ProfileCard
              userProfile={userProfile}
              bannerClassname={bannerClassname}
              bannerCSS={bannerCSS}
            />
          ) : (
            <ProfileCardSkeleton />
          )}
          {userProfile && (
            <ProfileLinks
              username={userProfile.username}
              loadingLinks={loadingLinks}
              links={links}
              onLinkClick={onLinkClick}
            />
          )}
          <FooterAttribution />
        </main>
      </div>
    </>
  );
};

export default PublicPage;
