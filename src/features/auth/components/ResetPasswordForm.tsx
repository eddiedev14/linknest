import { FaArrowRight } from "react-icons/fa6";
import { CiLock } from "react-icons/ci";
import { Button } from "@/shared/components/shadcn/button";
import { Label } from "@/shared/components/shadcn/label";
import { InputField } from "@/shared/components/forms/fields";
import { Loader } from "@/shared/components/app/Loader";
import { useResetPasswordForm } from "../hooks/useResetPasswordForm";

export const ResetPasswordForm = () => {
  const { isValidating, errors, register, onSubmit } = useResetPasswordForm();

  if (isValidating) {
    return <Loader />;
  }

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={onSubmit}
      noValidate
      aria-label={"Reset Password Form"}
    >
      {/* Password */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">New Password</Label>
        <InputField
          Icon={CiLock}
          id="password"
          type="password"
          autoComplete="new-password"
          registration={register("password")}
          errorMsg={errors.password?.message}
        />
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <InputField
          Icon={CiLock}
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          registration={register("confirmPassword")}
          errorMsg={errors.confirmPassword?.message}
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        className="w-full h-11 font-semibold shadow-md shadow-primary/20 gap-2"
      >
        Reset Password
        <FaArrowRight data-icon="inline-end" aria-hidden="true" />
      </Button>
    </form>
  );
};
