import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { USERNAME_REGEX } from "@/features/auth/constants/regex.constant";

interface FormData {
  search: string;
}

export const useSearchBar = () => {
  //* States
  const [results] = useState<string[]>([]);

  //* React Hook Form
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      search: "",
    },
  });

  //* React Router
  const navigate = useNavigate();

  //* Functions
  const goToProfile = (search: string) => {
    // Only go to the profile when is a valid username
    if (!USERNAME_REGEX.test(search)) {
      toast.error("Your search is not a valid username");
      return;
    }

    navigate(`/u/${search}`);
  };

  //* Handlers
  const onSubmit = (data: FormData) => {
    console.log("Submitiando...", data);
    goToProfile(data.search);
  };

  return {
    results,
    control,
    handleSearch: handleSubmit(onSubmit),
  };
};
