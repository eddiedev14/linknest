import { FaRegCopy, FaShareFromSquare } from "react-icons/fa6";
import { Button } from "../../shadcn/button";

interface Props {
  url: string;
}

export const ShareButton = ({ url }: Props) => {
  return (
    <div
      className="fixed right-6 bottom-6 md:right-8 md:bottom-8 flex items-center h-16 max-w-16 hover:max-w-md overflow-hidden rounded-full border border-border shadow-sm transition-[max-width] duration-300 ease-in-out cursor-pointer"
      aria-label="Share your public profile URL"
      title="Share your public profile URL"
    >
      {/* Share icon */}
      <div className="flex h-16 w-16 shrink-0 items-center justify-center">
        <FaShareFromSquare className="w-6 h-6 text-primary" />
      </div>

      <div className="flex items-center gap-4 pr-5 whitespace-nowrap">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Share your page</span>
          <span className="font-bold text-sm">{url}</span>
        </div>

        <Button aria-label="Copy the public profile URL to clipboard">
          <FaRegCopy aria-hidden="true" />
          Copy
        </Button>
      </div>
    </div>
  );
};
