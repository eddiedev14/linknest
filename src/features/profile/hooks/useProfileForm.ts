/* eslint-disable react-hooks/incompatible-library */
import { useEffect, useState } from "react";
import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
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
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(profileFormScheme),
    mode: "onBlur",
  });

  const country = watch("country");

  //* Navigate
  const navigate = useNavigate();

  //* Effects
  useEffect(() => {
    if (!user) return;

    reset({
      displayName: user.displayName ?? "",
      bio: user.bio ?? "",
      professionalRole: user.professionalRole ?? "",
      professionalStatus: user.professionalStatus ?? null,
      country: user.location?.country ?? "",
      city: user.location?.city ?? "",
      techStack: user.techStack ?? [],
      languages: user.languages ?? [],
    });
  }, [user, reset]);

  /*
  useEffect(() => {
    const getCountriesOptions = async () => {
      const countriesNames = await getAllCountries();
      setCountriesOptions(countriesNames);
    };

    getCountriesOptions();
  }, []);

  useEffect(() => {
    if (!getValues("country")) {
      setCitiesOptions([]);
      return;
    }

    const getCitiesOptions = async () => {
      const citiesNames = await getCitiesFromCountry(getValues("country") as string);
      setCitiesOptions(citiesNames);
    };

    getCitiesOptions();
  }, []);
  */

  //* Handlers
  const handleProfileFormSubmit = async (data: FormData) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      displayName: data.displayName ?? "",
      bio: data.bio ?? "",
      professionalRole: data.professionalRole ?? "",
      professionalStatus: data.professionalStatus ?? null,
      location: {
        country: data.country ?? "",
        city: data.city ?? "",
      },
      techStack: data.techStack ?? [],
      languages: data.languages ?? [],
    };

    try {
      const error = await updateUserProfile(updatedUser);
      if (error) throw new Error(error);
      toast.success("Your profile info was updated");
      navigate("/links");
    } catch {
      toast.error("Error updating your profile info");
    }
  };

  return {
    countriesOptions,
    citiesOptions,
    errors,
    control,
    country,
    register,
    setValue,
    onSubmit: handleSubmit(handleProfileFormSubmit),
  };
};
