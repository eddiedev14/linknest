import { LINK_PLATFORMS_MAP } from "@/data/links.data";
import type { LinkDoc } from "@/features/links/types/link.type";

interface Props {
  link: LinkDoc;
}

export const UserLinkItem = ({ link }: Props) => {
  const { label, platform, url } = link;
  const { Icon, bgColor } = LINK_PLATFORMS_MAP[platform];

  return (
    <li>
      <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${label}`}>
        <div className="group flex items-center gap-3 bg-background rounded-2xl border border-border px-4 py-4 shadow-sm transition-shadow">
          {/* Platform icon badge */}
          <div
            className="size-8 rounded-lg flex items-center justify-center text-white"
            style={{ backgroundColor: bgColor }}
          >
            <Icon />
          </div>

          {/* Link Info */}
          <div className="flex-1 min-w-0 flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-foreground truncate leading-tight">
                {label}
              </h3>
            </div>
            <span className="text-xs text-muted-foreground truncate">{url}</span>
          </div>
        </div>
      </a>
    </li>
  );
};
