/** biome-ignore-all lint/a11y/noRedundantAlt: <> */
import { useState } from "react";
import { Button } from "@/shared/components/shadcn/button";
import { FaImage, FaTrash } from "react-icons/fa6";
import { Loader } from "@/shared/components/app/Loader";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useAvatarForm } from "@/features/profile/hooks/useAvatarForm";
import { ConfirmDialog } from "@/shared/components/forms/ConfirmDialog";

interface Props {
  onSuccess: () => void;
}

export const AvatarForm = ({ onSuccess }: Props) => {
  const { user } = useAuth();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const {
    avatarPhoto,
    avatarPreviewURL,
    fileInputRef,
    isUploading,
    isDeleting,
    handleFileClick,
    handleFileChange,
    removeAvatar,
    handleAvatarSubmit,
  } = useAvatarForm();

  return (
    <>
      <Button
        onClick={handleFileClick}
        className="group relative bg-background w-full h-40 my-2 flex flex-col justify-center gap-2 items-center rounded-md border-2 border-dashed border-primary cursor-pointer hover:bg-background"
      >
        <div className="size-16 bg-primary/20 text-primary text-xl flex items-center justify-center rounded-full transition-transform group-hover:-translate-y-2">
          {avatarPreviewURL ? (
            <img
              src={avatarPreviewURL}
              alt={avatarPhoto?.name || "User Profile Photo"}
              className="size-full rounded-full object-cover"
            />
          ) : (
            <FaImage className="size-7" />
          )}
        </div>
        <h3 className="text-foreground font-medium text-base">¡Click here to upload your image!</h3>
        <span className="text-muted-foreground -mt-1 text-sm">
          Supported file formats: JPG, PNG, JPEG
        </span>
      </Button>

      {avatarPhoto && (
        <p className="text-sm text-muted-foreground">
          Your current file: <span className="text-primary font-medium">{avatarPhoto.name}</span>
        </p>
      )}

      <form className="flex" onSubmit={(e) => handleAvatarSubmit(e, onSuccess)}>
        <input
          ref={fileInputRef}
          onChange={handleFileChange}
          type="file"
          accept=".png, .jpg, .jpeg"
          className="sr-only"
          aria-label="Upload profile photo"
        />
        {user?.avatar.url && (
          <>
            <Button
              onClick={() => setConfirmOpen(true)}
              disabled={isDeleting}
              type="button"
              variant="destructive"
              className="flex-1 mr-2"
            >
              <FaTrash /> Remove your photo
            </Button>

            <ConfirmDialog
              open={confirmOpen}
              onOpenChange={setConfirmOpen}
              title="Remove photo?"
              text="If you continue, your avatar will be deleted and you will be left with a default photo (user icon)."
              onConfirm={removeAvatar}
            />
          </>
        )}
        <Button type="submit" disabled={isUploading} className="flex-1">
          {isUploading ? <Loader size="sm" /> : "Save"}
        </Button>
      </form>
    </>
  );
};
