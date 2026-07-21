import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { linkFormScheme } from "../validations/link.scheme";
import type { LinkFormData } from "../types/link.type";
import { useLink } from "./useLink";

export const useLinkForm = (onSuccess: () => void) => {
  //* Custom hook
  const { linkToEdit, addLink, editLink, handleSetLinkToEdit } = useLink();
  const isEditing = !!linkToEdit;

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

  //* Handlers
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

      // Reset link dialog
      if (isEditing) handleSetLinkToEdit(null);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    errors,
    isSaving,
    selectedPlatform,
    isEditing,
    register,
    setValue,
    onSubmit: handleSubmit(handleLinkFormSubmit),
  };
};
