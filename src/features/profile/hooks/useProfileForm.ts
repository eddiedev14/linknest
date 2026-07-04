/* eslint-disable react-hooks/incompatible-library */
import { useState, useEffect } from "react";
import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { profileFormScheme } from "../validations/profile.scheme";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getAllCountries, getCitiesFromCountry } from "../actions/countriesNow.actions";
import type { SelectOption } from "@/shared/components/forms/fields/SelectField";

export const useProfileForm = () => {
  //* States
  const [countriesOptions, setCountriesOptions] = useState<SelectOption[]>([]);
  const [citiesOptions, setCitiesOptions] = useState<SelectOption[]>([]);

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
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(profileFormScheme),
    mode: "onBlur",
    values: user // Default values
      ? {
          username: user.username,
          displayName: user.displayName,
          bio: user.bio,
          professionalRole: user.professionalRole,
          professionalStatus: user.professionalStatus,
          country: user.location.country,
          city: user.location.city,
          techStack: user.techStack,
          languages: user.languages,
        }
      : undefined,
  });

  const country = watch("country");

  //* Effects
  useEffect(() => {
    const getCountriesOptions = async () => {
      const countriesNames = await getAllCountries();
      setCountriesOptions(countriesNames);
    };

    getCountriesOptions();
  }, []);

  useEffect(() => {
    if (!country) {
      setCitiesOptions([]);
      return;
    }

    const getCitiesOptions = async () => {
      const citiesNames = await getCitiesFromCountry(country);
      setCitiesOptions(citiesNames);
    };

    getCitiesOptions();
  }, [country, setValue]);

  //* Handlers
  const handleProfileFormSubmit = async (data: FormData) => {
    if (!user) return;
    console.log("DATA", data);

    const updatedFields = {
      username: data.username,
      displayName: data.displayName,
      bio: data.bio,
      professionalRole: data.professionalRole,
      professionalStatus: data.professionalStatus,
      location: {
        country: data.country,
        city: data.city,
      },
      techStack: data.techStack,
      languages: data.languages,
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
    country,
    isMissingUsername: user?.username === "",
    register,
    setValue,
    onSubmit: handleSubmit(handleProfileFormSubmit),
  };
};
