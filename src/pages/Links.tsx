import { FaLink, FaPlus } from "react-icons/fa6";
import { Button } from "@/shared/components/shadcn/button";
import { PageHeader } from "@/shared/components/app/PageHeader";
import { useDialog } from "@/shared/hooks/useDialog";
import { LinkDialog } from "@/features/links/components/LinkDialog";

export const Links = () => {
  const { open, onOpenChange, handleOpenDialog } = useDialog();

  return (
    <main className="flex-1 flex flex-col items-center py-10 px-4" aria-label="Manage your links">
      <div className="w-full max-w-2xl flex flex-col gap-6">
        {/* Page header */}
        <PageHeader
          title="My Links"
          description="Add, reorder and customize the links that appear on your public page."
        />

        {/* Link Dialog */}
        <LinkDialog open={open} onOpenChange={onOpenChange} />

        {/* Empty Links */}
        <div className="flex flex-col items-center gap-4 py-8 px-6 text-center bg-background rounded-2xl border-2 border-dashed border-border">
          <div className="size-14 rounded-2xl bg-accent flex items-center justify-center">
            <FaLink size={24} className="text-primary" aria-hidden="true" />
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="font-heading font-semibold text-base text-foreground">No links yet</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Add your first link to start building your public page.
            </p>
          </div>
          <Button
            size="lg"
            className="h-10 px-6 rounded-xl font-semibold text-sm shadow-sm shadow-primary/20 gap-2"
            onClick={handleOpenDialog}
          >
            <FaPlus size={15} aria-hidden="true" />
            Add your first link
          </Button>
        </div>
      </div>
    </main>
  );
};
