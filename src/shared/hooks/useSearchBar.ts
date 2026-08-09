import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { USERNAME_REGEX } from "@/features/auth/constants/regex.constant";

interface FormData {
  search: string;
}

export const useSearchBar = () => {
  //* States

  //* React Hook Form
  const { register, handleSubmit } = useForm<FormData>();

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
    goToProfile(data.search);
  };

  return {
    register,
    handleSearch: handleSubmit(onSubmit),
  };
};
