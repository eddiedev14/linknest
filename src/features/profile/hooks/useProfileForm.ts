/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { SelectOption } from "@/shared/components/forms/FormField";
import type { ProfileForm } from "../types/profileForm.type";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getAllCountries, getCitiesFromCountry } from "../actions/countriesNow.actions";

export const useProfileForm = () => {
  //* States
  const [form, setForm] = useState<ProfileForm>({
    displayName: "",
    bio: "",
    professionalRole: "",
    professionalStatus: "",
    country: "",
    city: "",
    techStack: [],
    languages: [],
    experienceYears: null,
  });

  //? States for dinamically selects
  const [countriesOptions, setCountriesOptions] = useState<SelectOption[]>([]);
  const [citiesOptions, setCitiesOptions] = useState<SelectOption[]>([]);

  //* Context
  const { user, updateUserProfile } = useAuth();

  //* Navigate
  const navigate = useNavigate();

  //* Effects
  useEffect(() => {
    if (!user) return;

    setForm({
      displayName: user.displayName ?? "",
      bio: user.bio ?? "",
      professionalRole: user.professionalRole ?? "",
      professionalStatus: user.professionalStatus ?? "",
      country: user.location.country ?? "",
      city: user.location.city ?? "",
      techStack: user.techStack ?? [],
      languages: user.languages ?? [],
      experienceYears: user.experienceYears ?? null,
    });
  }, [user]);

  useEffect(() => {
    const getCountriesOptions = async () => {
      const countriesNames = await getAllCountries();
      setCountriesOptions(countriesNames);
    };

    getCountriesOptions();
  }, []);

  useEffect(() => {
    if (!form.country) {
      setCitiesOptions([]);
      return;
    }

    const getCitiesOptions = async () => {
      const citiesNames = await getCitiesFromCountry(form.country);
      setCitiesOptions(citiesNames);
    };

    getCitiesOptions();
  }, [form.country]);

  //* Handlers
  const handleFieldChange = (value: string, name: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const {
      displayName,
      bio,
      professionalRole,
      professionalStatus,
      country,
      city,
      techStack,
      languages,
      experienceYears,
    } = form;

    const updatedUser = {
      ...user,
      displayName: displayName,
      bio: bio,
      professionalRole: professionalRole,
      professionalState: professionalStatus,
      location: {
        country: country,
        city: city,
      },
      techStack: techStack,
      languages: languages,
      experienceYears: experienceYears,
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
    form,
    countriesOptions,
    citiesOptions,
    handleFieldChange,
    handleProfileFormSubmit,
  };
};
