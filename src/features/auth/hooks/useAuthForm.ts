import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { authScheme } from "../validations/auth.scheme";
import type { UserLogin, UserRegister } from "../types/user.type";
import { useAuth } from "./useAuth";

type FormData = {
  email: string;
  password: string;
  username?: string;
  confirmPassword?: string;
};

export const useAuthForm = (isSignup: boolean) => {
  //* Contexts
  const { registerWithEmailAndPassword, loginWithEmailAndPassword } = useAuth();

  //* React Hook Form
  const schema = authScheme(isSignup);

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

  const handleLogin = async (data: FormData) => {
    const user = data as UserLogin;
    const errorMessage = await loginWithEmailAndPassword(user);

    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    toast.success("Successfully logged in");
  };

  return {
    errors,
    register,
    onSubmit: handleSubmit(isSignup ? handleRegister : handleLogin),
  };
};
