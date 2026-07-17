import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { linkFormScheme } from "../validations/link.scheme";
import type { LinkFormData } from "../types/link.type";
import { useLink } from "./useLink";
import { toast } from "react-toastify";

export const useLinkForm = (onSuccess: () => void) => {
  //* Custom hook
  const { loading, addLink } = useLink();

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
    values: {
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
    const error = await addLink(data);
    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Link added successfully");
    reset();
    onSuccess();
  };

  return {
    errors,
    loading,
    selectedPlatform,
    register,
    setValue,
    onSubmit: handleSubmit(handleLinkFormSubmit),
  };
};
