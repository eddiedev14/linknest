import { useState } from "react";
import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { profileFormScheme } from "../validations/profile.scheme";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { SelectOption } from "@/shared/components/forms/fields/SelectField";

export const useProfileForm = () => {
  //* States
  const [countriesOptions] = useState<SelectOption[]>([]);
  const [citiesOptions] = useState<SelectOption[]>([]);

  //* Context
  const { user, updateUserProfile } = useAuth();

  //* React Hook Form
  type FormData = z.input<typeof profileFormScheme>;

  const {
    formState: { errors },
    control,
    register,
    handleSubmit,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(profileFormScheme),
    mode: "onBlur",
    values: user // Default values
      ? {
          displayName: user.displayName,
          bio: user.bio,
          professionalRole: user.professionalRole,
          professionalStatus: user.professionalStatus,
        }
      : undefined,
  });

  //* Handlers
  const handleProfileFormSubmit = async (data: FormData) => {
    if (!user) return;
    console.log("DATA", data);

    const updatedFields = {
      displayName: data.displayName,
      bio: data.bio,
      professionalRole: data.professionalRole,
      professionalStatus: data.professionalStatus,
    };

    try {
      const error = await updateUserProfile(updatedFields);
      if (error) throw new Error(error);
      toast.success("Your profile info was updated");
    } catch {
      toast.error("Error updating your profile info");
    }
  };

  return {
    countriesOptions,
    citiesOptions,
    errors,
    control,
    register,
    setValue,
    onSubmit: handleSubmit(handleProfileFormSubmit),
  };
};
