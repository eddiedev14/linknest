import { LinksSkeleton } from "@/features/links/components/LinksSkeleton";
import { UserLinkItem } from "./UserLinkItem";
import { NoLinksPlaceholder } from "@/features/links/components/NoLinksPlaceholder";
import type { LinkDoc } from "@/features/links/types/link.type";

interface Props {
  username: string;
  loadingLinks: boolean;
  links: LinkDoc[];
  onLinkClick: (link: LinkDoc) => Promise<void>;
}

export const ProfileLinks = ({ username, loadingLinks, links, onLinkClick }: Props) => {
  return (
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
  );
};
