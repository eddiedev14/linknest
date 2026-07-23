import { useState } from "react";
import { cn } from "@/lib/utils";
import { FaBriefcase, FaCheck, FaGlobe, FaLink, FaMapPin } from "react-icons/fa6";
import { PageLoader } from "@/shared/components/app/PageLoader";
import { UserBanner } from "@/shared/components/app/user/UserBanner";
import { usePublicPage } from "@/features/public-page/hooks/usePublicPage";
import { UserAvatar } from "@/shared/components/app/user/UserAvatar";
import { UserProfessionalStatusPill } from "../shared/components/app/user/UserProfessionalStatusPill";
import { UserTechPill } from "@/shared/components/app/user/UserTechPill";
import { UserLanguagePill } from "@/shared/components/app/user/UserLanguagePill";
import { FooterAttribution } from "@/shared/components/app/FooterAttribution";
import { Navigate } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────

type LinkEntry = {
  id: string;
  label: string;
  url: string;
  platform: string;
  color: string;
  icon: React.ReactNode;
};

// ─── Inline platform icons ────────────────────────────────────────────────────

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function DevToIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
      <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.29zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z" />
    </svg>
  );
}

function WebsiteIcon() {
  return <FaGlobe className="size-5" aria-hidden="true" />;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const LINKS: LinkEntry[] = [
  {
    id: "1",
    label: "GitHub — @eddiedev14",
    url: "https://github.com/eddiedev14",
    platform: "GitHub",
    color: "#24292e",
    icon: <GithubIcon />,
  },
  {
    id: "2",
    label: "LinkedIn Profile",
    url: "https://linkedin.com/in/eddiedev14",
    platform: "LinkedIn",
    color: "#0077b5",
    icon: <LinkedInIcon />,
  },
  {
    id: "3",
    label: "YouTube — Tech Tutorials",
    url: "https://youtube.com/@eddiedev14",
    platform: "YouTube",
    color: "#ff0000",
    icon: <YouTubeIcon />,
  },
  {
    id: "4",
    label: "Articles on Dev.to",
    url: "https://dev.to/eddiedev14",
    platform: "Dev.to",
    color: "#0a0a0a",
    icon: <DevToIcon />,
  },
  {
    id: "5",
    label: "Twitter / X",
    url: "https://x.com/eddiedev14",
    platform: "Twitter",
    color: "#000000",
    icon: <TwitterIcon />,
  },
  {
    id: "6",
    label: "Personal Website",
    url: "https://eddiedev.io",
    platform: "Website",
    color: "#6366f1",
    icon: <WebsiteIcon />,
  },
];

// ─── Link card ────────────────────────────────────────────────────────────────

function LinkCard({ link }: { link: LinkEntry }) {
  const [clicked, setClicked] = useState(false);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
      window.open(link.url, "_blank", "noopener,noreferrer");
    }, 380);
  }

  return (
    <a
      href={link.url}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex items-center gap-4 w-full rounded-2xl border border-border bg-background px-5 py-4",
        "hover:border-primary/40 hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5",
        "transition-all duration-200 cursor-pointer",
      )}
      aria-label={`Open ${link.label}`}
    >
      {/* Icon */}
      <div
        className="size-10 rounded-xl flex items-center justify-center shrink-0 text-white shadow-sm transition-transform group-hover:scale-105"
        style={{ backgroundColor: link.color }}
      >
        {link.icon}
      </div>

      {/* Label */}
      <span className="flex-1 text-sm font-semibold text-foreground leading-tight">
        {link.label}
      </span>

      {/* Arrow / Check */}
      <div className="shrink-0 size-7 rounded-lg flex items-center justify-center text-muted-foreground/50 group-hover:text-primary group-hover:bg-accent transition-all">
        {clicked ? (
          <FaCheck size={14} className="text-primary" aria-hidden="true" />
        ) : (
          <FaLink size={14} aria-hidden="true" />
        )}
      </div>
    </a>
  );
}

export function PublicPage() {
  const { username, userProfile, loading, bannerClassname, bannerCSS } = usePublicPage();

  if (loading) {
    return <PageLoader />;
  }

  if (!userProfile) {
    return <Navigate to="/404" replace />;
  }

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
                <FaMapPin size={13} className="text-muted-foreground shrink-0" aria-hidden="true" />
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
        <section className="w-full flex flex-col gap-3" aria-label="Eddie's links">
          <div className="flex items-center justify-between px-1 mb-1">
            <h2 className="font-heading text-sm font-bold text-foreground uppercase tracking-widest">
              Links
            </h2>
            <span className="text-xs text-muted-foreground">{LINKS.length} published</span>
          </div>

          {LINKS.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </section>

        {/* ── Footer attribution ── */}
        <FooterAttribution />
      </main>
    </div>
  );
}
