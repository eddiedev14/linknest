import { Button } from "@/shared/components/shadcn/button";
import { Label } from "@/shared/components/shadcn/label";

import { CiLock, CiMail, CiUser } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa6";

import { FormField } from "@/shared/components/forms/FormField";
import { useAuthForm } from "../hooks/useAuthForm";

interface Props {
  isSignup: boolean;
}

export const AuthForm = ({ isSignup }: Props) => {
  const {
    formRef,
    formErrors,
    handleBlurEmail,
    handleBlurUsername,
    handleBlurPassword,
    handleSubmit,
  } = useAuthForm(isSignup);

  const {
    email: emailError,
    username: usernameError,
    password: passwordError,
  } = formErrors;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
      noValidate
      aria-label={isSignup ? "Registration Form" : "Login Form"}
    >
      {/* Email */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <FormField
          Icon={CiMail}
          id="email"
          type="email"
          placeholder="you@example.com"
          errorMsg={emailError}
          onBlur={handleBlurEmail}
        />
      </div>

      {/* Username */}
      {isSignup && (
        <div className="flex flex-col gap-2">
          <Label htmlFor="username">Username</Label>
          <FormField
            Icon={CiUser}
            id="username"
            type="text"
            placeholder="Your Username"
            errorMsg={usernameError}
            hint="This will be your public profile URL."
            onBlur={handleBlurUsername}
          />
        </div>
      )}

      {/* Password */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <FormField
          Icon={CiLock}
          id="password"
          type="password"
          errorMsg={passwordError}
          onBlur={handleBlurPassword}
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        className="w-full h-11 font-semibold shadow-md shadow-primary/20 gap-2"
      >
        Create my account
        <FaArrowRight data-icon="inline-end" size={15} aria-hidden="true" />
      </Button>
    </form>
  );
};
