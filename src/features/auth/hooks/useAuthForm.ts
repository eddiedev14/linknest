import type z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { authScheme } from "../validations/auth.scheme";
import type { UserRegister } from "../types/user.type";
import { useAuth } from "./useAuth";

export const useAuthForm = (isSignup: boolean) => {
  //* Contexts
  const { registerWithEmailAndPassword } = useAuth();

  //* React Hook Form
  const schema = authScheme(isSignup);
  type FormData = z.infer<typeof schema>;

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  // * Functions
  const handleRegister = async (data: FormData) => {
    const user = data as UserRegister;
    const errorMessage = await registerWithEmailAndPassword(user);

    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    toast.success("User created successfully");
  };

  return {
    errors,
    register,
    onSubmit: handleSubmit(isSignup ? handleRegister : () => {}),
  };
};
