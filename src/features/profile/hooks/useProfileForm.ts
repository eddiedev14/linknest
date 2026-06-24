/* eslint-disable react-hooks/set-state-in-effect */
/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <> */
import { useEffect, useState } from "react";
import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { profileFormScheme } from "../validations/profile.scheme";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { SelectOption } from "@/shared/components/forms/fields/SelectField";
import { getAllCountries, getCitiesFromCountry } from "../actions/countriesNow.actions";

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
    reset,
    getValues,
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
      professionalStatus: user.professionalStatus,
      country: user.location?.country ?? "",
      city: user.location?.city ?? "",
      techStack: user.techStack ?? [],
      languages: user.languages ?? [],
      experienceYears: user.experienceYears !== null ? String(user.experienceYears) : "",
    });

    console.log(watch());
  }, [user]);

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
      professionalStatus: data.professionalStatus,
      location: {
        country: data.country ?? "",
        city: data.city ?? "",
      },
      techStack: data.techStack ?? [],
      languages: data.languages ?? [],
      experienceYears:
        data.experienceYears && data.experienceYears !== "" ? Number(data.experienceYears) : null,
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
    watch,
  };
};
