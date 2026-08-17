import { SEO } from "@/shared/components/SEO";
import { PageHeader } from "@/shared/components/app/PageHeader";
import { LinkDialog } from "@/features/links/components/LinkDialog";
import { LinksSkeleton } from "@/features/links/components/LinksSkeleton";
import { LinkList } from "@/features/links/components/LinkList";
import { NoLinksPlaceholder } from "@/features/links/components/NoLinksPlaceholder";
import { useMyLinks } from "@/features/links/hooks/useMyLinks";

const Links = () => {
  const { loadingLinks, linksCount, handleOpenDialog } = useMyLinks();

  return (
    <>
      <SEO
        title="My Links"
        description="Manage, organize, edit, and share all your links from your LinkNest dashboard in one place."
        path="/links"
        noIndex
      />

      <main className="flex-1 flex flex-col items-center py-10 px-4" aria-label="Manage your links">
        <div className="w-full max-w-2xl flex flex-col gap-6">
          {/* Page header */}
          <PageHeader
            title="My Links"
            description="Add, reorder and customize the links that appear on your public page."
          />

          {/* Link Dialog */}
          <LinkDialog />

          {/* Content */}
          {loadingLinks ? (
            <LinksSkeleton />
          ) : linksCount > 0 ? (
            <LinkList />
          ) : (
            <NoLinksPlaceholder
              title="No links yet"
              paragraph="Add your first link to start building your public page."
              onOpenDialog={handleOpenDialog}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default Links;
