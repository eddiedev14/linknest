import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { USERNAME_REGEX } from "@/features/auth/constants/regex.constant";

interface FormData {
  search: string;
}

export const useSearchBar = () => {
  //* React Hook Form
  const { register, handleSubmit } = useForm<FormData>();

  //* React Router
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    const { search } = data;

    // Only search when is a valid username
    if (!USERNAME_REGEX.test(search)) {
      toast.error("Your search is not a valid username");
      return;
    }

    navigate(`/u/${search}`);
  };

  return {
    register,
    handleSearch: handleSubmit(onSubmit),
  };
};
