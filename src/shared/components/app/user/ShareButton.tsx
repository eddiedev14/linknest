import { useState } from "react";
import { toast } from "react-toastify";
import { FaCheck, FaRegCopy, FaShareFromSquare } from "react-icons/fa6";
import { Button } from "../../shadcn/button";

interface Props {
  url: string;
}

export const ShareButton = ({ url }: Props) => {
  const [copied, setCopied] = useState(false);

  const copyURL = async () => {
    try {
      await navigator.clipboard.writeText(`Check out my links on LinkNest: ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Error while copying to the clipboard");
    }
  };

  return (
    <div
      tabIndex={0}
      role="group"
      className="bg-background fixed right-4 bottom-4 sm:right-6 sm:bottom-6 md:right-8 md:bottom-8 flex items-center h-16 max-w-16 hover:max-w-[calc(100vw-2rem)] focus-within:max-w-[calc(100vw-2rem)] sm:hover:max-w-sm sm:focus-within:max-w-sm md:hover:max-w-md md:focus-within:max-w-md overflow-hidden rounded-full border border-border shadow-sm transition-[max-width] duration-300 ease-in-out cursor-pointer focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
      aria-label="Share your public profile URL"
      title="Share your public profile URL"
    >
      {/* Share icon */}
      <div className="flex h-16 w-16 shrink-0 items-center justify-center" aria-hidden="true">
        <FaShareFromSquare className="w-6 h-6 text-primary" />
      </div>

      <div className="flex items-center gap-2 sm:gap-4 pr-4 min-w-0">
        <div className="flex flex-col min-w-0">
          <span className="text-xs text-muted-foreground whitespace-nowrap">Share your page</span>
          <span className="font-bold text-sm truncate">{url}</span>
        </div>

        <Button
          aria-label="Copy the public profile URL to clipboard"
          className="shrink-0"
          onClick={copyURL}
        >
          {copied ? <FaCheck aria-hidden="true" /> : <FaRegCopy aria-hidden="true" />}
          <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
        </Button>
      </div>
    </div>
  );
};
