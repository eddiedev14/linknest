import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { PLATFORM_ENTRIES } from "@/data/links.data";
import { linkFormScheme } from "../validations/link.scheme";
import type { LinkFormData } from "../types/link.type";
import { useMyLinks } from "./useMyLinks";

export const useLinkForm = (onSuccess: () => void) => {
  //* Custom hook
  const { linkToEdit, addLink, editLink, handleSetLinkToEdit } = useMyLinks();

  //* States
  const [isSaving, setIsSaving] = useState(false);

  //* React Hook Form
  const {
    formState: { errors },
    control,
    register,
    setValue,
    reset,
    handleSubmit,
  } = useForm<LinkFormData>({
    resolver: zodResolver(linkFormScheme),
    mode: "onBlur",
    values: linkToEdit
      ? {
          platform: linkToEdit.platform,
          label: linkToEdit.label,
          url: linkToEdit.url,
        }
      : {
          platform: "website",
          label: "",
          url: "",
        },
  });

  const selectedPlatform = useWatch({
    control,
    name: "platform",
  });

  //* Calculated values
  const isEditing = !!linkToEdit;
  const saveMessage = isSaving
    ? isEditing
      ? "Updating..."
      : "Adding..."
    : isEditing
      ? "Update Link"
      : "Add Link";

  //* Handlers
  const handlePlatformKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      event.key !== "ArrowLeft" &&
      event.key !== "ArrowRight" &&
      event.key !== "ArrowUp" &&
      event.key !== "ArrowDown"
    ) {
      return;
    }

    event.preventDefault();

    const currentIndex = PLATFORM_ENTRIES.findIndex(([id]) => id === selectedPlatform);
    const direction = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
    const nextIndex =
      (currentIndex + direction + PLATFORM_ENTRIES.length) % PLATFORM_ENTRIES.length;
    const [nextId] = PLATFORM_ENTRIES[nextIndex];

    setValue("platform", nextId);
    document.getElementById(`platform-${nextId}`)?.focus();
  };

  const handleLinkFormSubmit = async (data: LinkFormData) => {
    setIsSaving(true);

    try {
      const error = isEditing ? await editLink(linkToEdit.id, data) : await addLink(data);

      if (error) {
        toast.error(error);
        return;
      }

      toast.success(isEditing ? "Link updated successfully" : "Link added successfully");
      reset();
      onSuccess();
      if (isEditing) handleSetLinkToEdit(null);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    errors,
    isSaving,
    selectedPlatform,
    isEditing,
    saveMessage,
    register,
    setValue,
    handlePlatformKeyDown,
    onSubmit: handleSubmit(handleLinkFormSubmit),
  };
};
