import { FaLink } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { Label } from "@/shared/components/shadcn/label";
import { Button } from "@/shared/components/shadcn/button";
import { InputField } from "@/shared/components/forms/fields";
import { LINK_PLATFORMS } from "@/data/links.data";

export const LinkForm = () => {
  return (
    <form noValidate aria-label="Add new Link" className="mt-4 flex flex-col gap-5">
      {/* Platform */}
      <div className="flex flex-col gap-2">
        <Label>Platform</Label>
        <div
          className="grid grid-cols-4 sm:grid-cols-5 gap-1"
          role="radiogroup"
          aria-label="Select a platform"
        >
          {LINK_PLATFORMS.map(({ id, name, Icon, bgColor }) => (
            <Button
              key={id}
              variant="outline"
              type="button"
              role="radio"
              aria-checked="false"
              aria-label={name}
              title={name}
              className="h-auto flex flex-col items-center gap-2 rounded-xl p-2.5 border transition-all text-xs font-medium border-border hover:border-muted-foreground/40 hover:bg-muted/50"
            >
              <div
                className="size-8 rounded-lg flex items-center justify-center text-white"
                style={{ backgroundColor: bgColor }}
              >
                <Icon />
              </div>
              <span className="text-[12px] text-muted-foreground truncate w-full text-center leading-tight">
                {name}
              </span>
            </Button>
          ))}
        </div>
      </div>

      {/* Label */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="label">Label</Label>
        <InputField
          Icon={FaLink}
          id="label"
          placeholder="Name your link"
          hint="This is what visitors will see as the button text."
        />
      </div>

      {/* URL */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="url">URL</Label>
        <InputField Icon={FiExternalLink} id="url" placeholder="Name your link" />
      </div>

      <Button>Add Link</Button>
    </form>
  );
};
