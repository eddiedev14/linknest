/** biome-ignore-all lint/a11y/noRedundantAlt: <> */
import { Button } from '@/shared/components/shadcn/button';
import { FaImage } from 'react-icons/fa6';
import { Loader } from '@/shared/components/app/Loader';
import { useAvatarDialog } from '@/features/profile/hooks/useAvatarForm';

export const AvatarForm = () => {
  const {
    avatarPhoto,
    avatarPreviewURL,
    fileInputRef,
    isUploading,
    isPending,
    handleFileClick,
    handleFileChange,
    handleAvatarSubmit,
  } = useAvatarDialog();

  if (isUploading || isPending) {
    return <Loader />;
  }

  return (
    <>
      <Button
        onClick={handleFileClick}
        className="group bg-white w-full h-40 my-2 flex flex-col justify-center gap-2 items-center rounded-md border-2 border-dashed border-primary cursor-pointer hover:bg-white"
      >
        <div className="size-16 bg-primary/20 text-primary text-xl flex items-center justify-center rounded-full transition-transform group-hover:-translate-y-2">
          {avatarPreviewURL ? (
            <img
              src={avatarPreviewURL}
              alt={avatarPhoto?.name || 'User Profile Photo'}
              className="size-full rounded-full object-cover"
            />
          ) : (
            <FaImage className="size-7" />
          )}
        </div>
        <h3 className="text-foreground font-medium text-base">¡Click here to upload your image!</h3>
        <span className="text-muted-foreground -mt-1 text-sm">Supported file formats: JPG, PNG, JPEG</span>
      </Button>

      {avatarPhoto && (
        <p className="text-sm text-muted-foreground">
          Your current file: <span className="text-primary font-medium">{avatarPhoto.name}</span>
        </p>
      )}

      <form className="flex" onSubmit={handleAvatarSubmit}>
        <input
          ref={fileInputRef}
          onChange={handleFileChange}
          type="file"
          accept=".png, .jpg, .jpeg"
          className="sr-only"
        />
        <Button className="flex-1">Save</Button>
      </form>
    </>
  );
};
