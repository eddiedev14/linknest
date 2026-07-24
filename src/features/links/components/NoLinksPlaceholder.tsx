import { FaLink, FaPlus } from "react-icons/fa6";
import { Button } from "@/shared/components/shadcn/button";

interface Props {
  title: string;
  paragraph: string;
  showButton?: boolean;
  onOpenDialog?: () => void;
}

export const NoLinksPlaceholder = ({
  title,
  paragraph,
  showButton = true,
  onOpenDialog = () => {},
}: Props) => {
  return (
    <div className="flex flex-col items-center gap-4 py-8 px-6 text-center bg-background rounded-2xl border-2 border-dashed border-border">
      <div className="size-14 rounded-2xl bg-accent flex items-center justify-center">
        <FaLink size={24} className="text-primary" aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="font-heading font-semibold text-base text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{paragraph}</p>
      </div>

      {showButton && (
        <Button
          size="lg"
          className="h-10 px-6 rounded-xl font-semibold text-sm shadow-sm shadow-primary/20 gap-2"
          onClick={onOpenDialog}
        >
          <FaPlus size={15} aria-hidden="true" />
          Add your first link
        </Button>
      )}
    </div>
  );
};
