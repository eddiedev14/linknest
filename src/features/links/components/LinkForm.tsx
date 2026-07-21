import { cn } from "@/lib/utils";
import { LINK_PLATFORMS_MAP, PLATFORM_ENTRIES } from "@/data/links.data";
import { FaLink } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { Label } from "@/shared/components/shadcn/label";
import { Button } from "@/shared/components/shadcn/button";
import { InputField } from "@/shared/components/forms/fields";
import { useLinkForm } from "../hooks/useLinkForm";

interface Props {
  onSuccess: () => void;
}

export const LinkForm = ({ onSuccess }: Props) => {
  const { errors, isSaving, selectedPlatform, isEditing, register, setValue, onSubmit } =
    useLinkForm(onSuccess);

  const saveMessage = isSaving
    ? isEditing
      ? "Updating..."
      : "Adding..."
    : isEditing
      ? "Update Link"
      : "Add Link";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-label={isEditing ? "Edit your link" : "Add new link"}
      className="mt-4 flex flex-col gap-5"
    >
      {/* Platform */}
      <div className="flex flex-col gap-2">
        <Label>Platform</Label>
        <div
          className="grid grid-cols-4 sm:grid-cols-5 gap-1.5"
          role="radiogroup"
          aria-label="Select a platform"
        >
          {PLATFORM_ENTRIES.map(([id, { name, Icon, bgColor }]) => (
            <Button
              key={id}
              variant="outline"
              type="button"
              role="radio"
              aria-checked={id === selectedPlatform}
              aria-label={name}
              title={name}
              onClick={() => setValue("platform", id)}
              tabIndex={id === selectedPlatform ? 0 : -1}
              className={cn(
                "h-auto flex flex-col items-center gap-1.5 rounded-xl p-2.5 border transition-all text-xs font-medium",
                id === selectedPlatform
                  ? "border-primary ring-2 ring-primary/20 bg-accent/40"
                  : "border-border hover:border-muted-foreground/40 hover:bg-muted/50",
              )}
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
          placeholder={`eg. ${LINK_PLATFORMS_MAP[selectedPlatform].name}`}
          hint="This is what visitors will see as the button text."
          registration={register("label")}
          errorMsg={errors.label?.message}
        />
      </div>

      {/* URL */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="url">URL</Label>
        <InputField
          Icon={FiExternalLink}
          id="url"
          placeholder="https://"
          registration={register("url")}
          errorMsg={errors.url?.message}
        />
      </div>

      <Button type="submit" disabled={isSaving}>
        {saveMessage}
      </Button>
    </form>
  );
};
