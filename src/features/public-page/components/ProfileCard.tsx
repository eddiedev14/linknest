import { FaBriefcase, FaMapPin } from "react-icons/fa6";
import { UserBanner } from "@/shared/components/app/user/UserBanner";
import { UserAvatar } from "@/shared/components/app/user/UserAvatar";
import { UserProfessionalStatusPill } from "./UserProfessionalStatusPill";
import { UserTechPill } from "./UserTechPill";
import { UserLanguagePill } from "./UserLanguagePill";
import type { UserDoc } from "@/features/auth/types/user.type";

interface Props {
  userProfile: UserDoc;
  bannerClassname?: string;
  bannerCSS?: { backgroundColor: string };
}

export const ProfileCard = ({ userProfile, bannerClassname, bannerCSS }: Props) => {
  const {
    username,
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
            <FaBriefcase size={13} className="text-muted-foreground shrink-0" aria-hidden="true" />
            <span className="text-sm text-foreground font-medium">{professionalRole}</span>
          </div>
        )}

        {/* Location */}
        {(city || country) && (
          <div className="flex items-center gap-1.5 mt-1">
            <FaMapPin size={13} className="text-muted-foreground shrink-0" aria-hidden="true" />
            <span className="text-sm text-muted-foreground">
              {[city, country].filter(Boolean).join(", ")}
            </span>
          </div>
        )}

        {/* Bio */}
        {bio && (
          <p className="text-sm text-muted-foreground leading-relaxed mt-4 text-pretty">{bio}</p>
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
  );
};
