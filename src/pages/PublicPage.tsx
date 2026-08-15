import { Navigate } from "react-router-dom";
import { FaBriefcase, FaMapPin } from "react-icons/fa6";
import { PageLoader } from "@/shared/components/app/PageLoader";
import { SEO } from "@/shared/components/SEO";
import { UserBanner } from "@/shared/components/app/user/UserBanner";
import { UserAvatar } from "@/shared/components/app/user/UserAvatar";
import { UserProfessionalStatusPill } from "../features/public-page/components/UserProfessionalStatusPill";
import { UserTechPill } from "@/features/public-page/components/UserTechPill";
import { UserLanguagePill } from "@/features/public-page/components/UserLanguagePill";
import { LinksSkeleton } from "@/features/links/components/LinksSkeleton";
import { UserLinkItem } from "@/features/public-page/components/UserLinkItem";
import { NoLinksPlaceholder } from "@/features/links/components/NoLinksPlaceholder";
import { FooterAttribution } from "@/shared/components/app/FooterAttribution";
import { usePublicPage } from "@/features/public-page/hooks/usePublicPage";

const PublicPage = () => {
  const {
    username,
    userProfile,
    links,
    loading,
    loadingLinks,
    bannerClassname,
    bannerCSS,
    onLinkClick,
  } = usePublicPage();

  if (loading) {
    return <PageLoader />;
  }

  if (!userProfile) {
    return <Navigate to="/404" replace />;
  }

  const description =
    userProfile.bio?.trim() ||
    `${userProfile.displayName} on LinkNest — ${userProfile.professionalRole}`;

  const {
    avatar: { url },
    professionalStatus,
    displayName,
    professionalRole,
    location: { city, country },
    bio,
    techStack,
    languages,
  } = userProfile;

  return (
    <>
      <SEO
        title={`${userProfile.displayName} (@${userProfile.username})`}
        description={description}
        path={`/u/${userProfile.username}`}
        image={userProfile.avatar?.url}
      />

      <div className="min-h-screen bg-muted/30 flex flex-col items-center">
        <main
          className="w-full max-w-xl px-5 pb-20 flex flex-col items-center"
          aria-label={`${username}'s public profile`}
        >
          {/* ── Profile card ── */}
          <div className="w-full bg-background rounded-3xl border border-border overflow-hidden shadow-sm mt-8 mb-6">
            <UserBanner className={bannerClassname} style={bannerCSS} />

            {/* Avatar */}
            <div className="px-6 pb-6">
              <div className="relative -mt-10 mb-3 flex justify-between items-end">
                <UserAvatar avatarURL={url} username={username} />

                {/* Employment status */}
                {professionalStatus && (
                  <UserProfessionalStatusPill professionalStatus={professionalStatus} />
                )}
              </div>

              {/* Name + username */}
              <h1 className="font-heading text-xl font-bold text-foreground leading-tight">
                {displayName || "Anonymous"}
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">@{username}</p>

              {/* Role */}
              {professionalRole && (
                <div className="flex items-center gap-1.5 mt-2">
                  <FaBriefcase
                    size={13}
                    className="text-muted-foreground shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-foreground font-medium">{professionalRole}</span>
                </div>
              )}

              {/* Location */}
              {(city || country) && (
                <div className="flex items-center gap-1.5 mt-1">
                  <FaMapPin
                    size={13}
                    className="text-muted-foreground shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-muted-foreground">
                    {[city, country].filter(Boolean).join(", ")}
                  </span>
                </div>
              )}

              {/* Bio */}
              {bio && (
                <p className="text-sm text-muted-foreground leading-relaxed mt-4 text-pretty">
                  {bio}
                </p>
              )}

              {/* Divider */}
              {(techStack.length > 0 || languages.length > 0) && (
                <div className="h-px bg-border mt-5 mb-4" />
              )}

              {/* Tags row */}
              <div className="flex flex-col gap-3">
                {/* Programming languages */}
                {techStack.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Stack
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {techStack.map((tech) => (
                        <UserTechPill key={tech} tech={tech} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Spoken languages */}
                {languages.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Languages
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {languages.map((lang) => (
                        <UserLanguagePill key={lang} language={lang} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Links ── */}
          <section className="w-full flex flex-col gap-3" aria-label={`${username}'s links`}>
            {loadingLinks ? (
              <LinksSkeleton />
            ) : links.length > 0 ? (
              <>
                <div className="flex items-center justify-between px-1 mb-1">
                  <h2 className="font-heading text-sm font-bold text-foreground uppercase tracking-widest">
                    Links
                  </h2>
                  <span className="text-xs text-muted-foreground">{links.length} published</span>
                </div>

                <ol className="flex flex-col gap-3">
                  {links.map((link) => (
                    <UserLinkItem key={link.id} link={link} onLinkClick={onLinkClick} />
                  ))}
                </ol>
              </>
            ) : (
              <NoLinksPlaceholder
                title="No links yet"
                paragraph={`${username} hasn't published any links yet. Check back later.`}
                showButton={false}
              />
            )}
          </section>

          {/* ── Footer attribution ── */}
          <FooterAttribution />
        </main>
      </div>
    </>
  );
};

export default PublicPage;
