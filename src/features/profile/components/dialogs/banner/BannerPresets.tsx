import { Button } from "@/shared/components/shadcn/button";
import { cn } from "@/lib/utils";
import { FaPencil } from "react-icons/fa6";
import { BANNER_PRESETS } from "@/features/auth/constants/bannerPresets.constant";
import { useBannerDialog } from "../../../hooks/useBannerDialog";

interface Props {
  onSuccess: () => void;
}

export const BannerPresets = ({ onSuccess }: Props) => {
  const {
    selectedColor,
    colorInputRef,
    isCustomColor,
    isSaving,
    setSelectedColor,
    handleCustomColorClick,
    handleBannerColorSubmit,
  } = useBannerDialog();

  return (
    <>
      <div className="grid grid-cols-5 sm:grid-cols-6 gap-3 sm:gap-4 justify-items-center">
        {BANNER_PRESETS.map((preset) => (
          <Button
            key={preset}
            onClick={() => setSelectedColor(preset)}
            type="button"
            className={cn(
              "h-10 w-10 rounded-full",
              preset,
              preset === selectedColor &&
                "scale-105 border-primary-foreground/80 ring-2 ring-primary ring-offset-2 shadow-lg",
            )}
            aria-label={`Banner color ${preset.replace("banner-", "").replaceAll("-", " ")}`}
            aria-pressed={preset === selectedColor}
          ></Button>
        ))}

        {/* Custom Color */}
        <div>
          <Button
            type="button"
            onClick={handleCustomColorClick}
            className={cn(
              "h-10 w-10 rounded-full bg-gray-500 hover:bg-gray-700",
              isCustomColor &&
                "scale-105 border-primary-foreground/80 ring-2 ring-primary ring-offset-2 shadow-lg",
            )}
            style={{
              backgroundColor: isCustomColor ? selectedColor : undefined,
            }}
            aria-label="Custom banner color"
            aria-pressed={isCustomColor}
          >
            <FaPencil aria-hidden="true" />
          </Button>
        </div>
      </div>

      <form onSubmit={(e) => handleBannerColorSubmit(e, onSuccess)} className="flex">
        <input
          ref={colorInputRef}
          type="color"
          className="sr-only"
          aria-label="Pick a custom banner color"
        />
        <Button type="submit" disabled={isSaving} className="flex-1 mt-2">
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </form>
    </>
  );
};
