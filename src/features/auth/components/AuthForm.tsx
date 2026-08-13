import { FaArrowRight } from "react-icons/fa6";
import { CiLock, CiMail, CiUser } from "react-icons/ci";
import { Button } from "@/shared/components/shadcn/button";
import { Label } from "@/shared/components/shadcn/label";
import { InputField } from "@/shared/components/forms/fields";
import { useAuthForm } from "../hooks/useAuthForm";

interface Props {
  isSignup: boolean;
}

export const AuthForm = ({ isSignup }: Props) => {
  const { errors, register, onSubmit } = useAuthForm(isSignup);

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5"
      noValidate
      aria-label={isSignup ? "Registration Form" : "Login Form"}
    >
      {/* Email */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <InputField
          Icon={CiMail}
          id="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          errorMsg={errors.email?.message}
          registration={register("email")}
        />
      </div>

      {/* Username */}
      {isSignup && (
        <div className="flex flex-col gap-2">
          <Label htmlFor="username">Username</Label>
          <InputField
            Icon={CiUser}
            id="username"
            placeholder="Your Username"
            autoComplete="username"
            errorMsg={errors.username?.message}
            hint="This will be your public profile URL."
            registration={register("username")}
          />
        </div>
      )}

      {/* Password */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <InputField
          Icon={CiLock}
          id="password"
          type="password"
          autoComplete={isSignup ? "new-password" : "current-password"}
          errorMsg={errors.password?.message}
          registration={register("password")}
        />
      </div>

      {/* Confirm Password */}
      {isSignup && (
        <div className="flex flex-col gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <InputField
            Icon={CiLock}
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            errorMsg={errors.confirmPassword?.message}
            registration={register("confirmPassword")}
          />
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        className="w-full h-11 font-semibold shadow-md shadow-primary/20 gap-2"
      >
        {isSignup ? "Create my Account" : "Sign in"}
        <FaArrowRight data-icon="inline-end" aria-hidden="true" />
      </Button>
    </form>
  );
};
