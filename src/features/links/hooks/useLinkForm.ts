import type { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { linkFormScheme } from "../validations/link.scheme";

export const useLinkForm = () => {
  //* React Hook Form
  type FormData = z.input<typeof linkFormScheme>;

  const {
    formState: { errors },
    control,
    register,
    setValue,
    handleSubmit,
  } = useForm<FormData>({
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
  const handleLinkFormSubmit = async (data: FormData) => {
    console.log(data);
  };

  return {
    errors,
    selectedPlatform,
    register,
    setValue,
    onSubmit: handleSubmit(handleLinkFormSubmit),
  };
};
