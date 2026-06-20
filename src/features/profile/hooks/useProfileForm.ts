import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { ProfileForm } from "../types/profileForm.type";
import { useAuth } from "@/features/auth/hooks/useAuth";

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

  //* Context
  const { user, updateUserProfile } = useAuth();

  //* Navigate
  const navigate = useNavigate();

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
    const location = [form.city, form.country].filter(Boolean).join(", ");

    try {
      const updatedUser = {
        ...user,
        displayName: form.displayName,
        bio: form.bio,
        professionalRole: form.professionalRole,
        professionalState: form.professionalStatus,
        location,
        techStack: form.techStack,
        languages: form.languages,
        experienceYears: form.experienceYears,
      };

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
    handleFieldChange,
    handleProfileFormSubmit,
  };
};
