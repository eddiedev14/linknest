import { useAvatarDialog } from "@/features/profile/hooks/useAvatarDialog";
import { Button } from "@/shared/components/shadcn/button";
import { FaImage } from "react-icons/fa6";

export const AvatarForm = () => {
  const { fileInputRef, handleFileClick } = useAvatarDialog();

  return (
    <>
      <Button
        onClick={handleFileClick}
        className="group bg-white w-full h-40 my-2 flex flex-col justify-center gap-2 items-center rounded-md border-2 border-dashed border-primary cursor-pointer hover:bg-white"
      >
        <div className="size-12 bg-primary/20 text-primary text-xl flex items-center justify-center rounded-full transition-transform group-hover:-translate-y-2">
          <FaImage />
        </div>
        <h3 className="text-foreground font-medium text-base">
          ¡Click here to upload your image!
        </h3>
        <span className="text-muted-foreground -mt-1 text-sm">
          Supported file formats: JPG, PNG, JPEG
        </span>
      </Button>

      <form className="flex">
        <input
          ref={fileInputRef}
          type="file"
          accept=".png, .jpg, .jpeg"
          className="sr-only"
        />
        <Button className="flex-1">Save</Button>
      </form>
    </>
  );
};
