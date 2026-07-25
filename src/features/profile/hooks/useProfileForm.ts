import { useState, useEffect } from "react";
import type { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
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

  //* Navigate
  const navigate = useNavigate();

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

  const country = useWatch({
    control,
    name: "country",
  });

  //* Effects
  useEffect(() => {
    let ignore = false;

    const loadCountries = async () => {
      try {
        const countries = await getAllCountries();
        if (!ignore) setCountriesOptions(countries);
      } catch {
        if (!ignore) toast.error("An error occurred while retrieving the countries");
      }
    };

    loadCountries();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!country) return;
    let ignore = false;

    const loadCities = async () => {
      try {
        const cities = await getCitiesFromCountry(country);
        if (!ignore) setCitiesOptions(cities);
      } catch {
        if (!ignore) toast.error("An error occurred while retrieving the cities from the country");
      }
    };

    loadCities();

    return () => {
      ignore = true;
    };
  }, [country]);

  //* Handlers
  const handleProfileFormSubmit = async (data: FormData) => {
    if (!user) return;

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

    const error = await updateUserProfile(updatedFields);
    if (error) {
      toast.error("Error updating your profile info");
      return;
    }

    toast.success("Your profile info was updated");
    navigate("/links");
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
