import { Button } from "@/shared/components/shadcn/button";
import { cn } from "@/lib/utils";
import { FaPencil } from "react-icons/fa6";
import { BANNER_PRESETS } from "@/data/profile.data";
import { useBannerDialog } from "../../../hooks/useBannerDialog";

export const BannerPresets = () => {
  const {
    selectedColor,
    colorInputRef,
    isCustomColor,
    setSelectedColor,
    handleCustomColorClick,
  } = useBannerDialog();

  return (
    <>
      <form className="grid grid-cols-6 gap-4 justify-items-center">
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
            aria-label={preset}
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
            aria-label="Custom Color"
          >
            <FaPencil size={12} />
          </Button>

          <input ref={colorInputRef} type="color" className="sr-only" />
        </div>
      </form>

      <Button className="mt-4">Save</Button>
    </>
  );
};
