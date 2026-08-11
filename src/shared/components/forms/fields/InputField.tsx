import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import type { IconType } from "react-icons";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { Input } from "../../shadcn/input";
import { Button } from "../../shadcn/button";
import { FormFieldError } from "../FieldError";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon: IconType;
  errorMsg?: string;
  hint?: string;
  registration?: UseFormRegisterReturn;
}

export const InputField = ({ Icon, errorMsg, hint, registration, ...attrs }: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputType =
    attrs.type !== "password" ? attrs.type : isPasswordVisible ? "text" : "password";

  return (
    <>
      <div className="relative">
        <Icon className="absolute left-3 top-3.75 text-muted-foreground pointer-events-none" />
        <Input
          type={inputType}
          className={cn(errorMsg && "border-destructive", attrs.className)}
          {...attrs}
          {...registration}
        />

        {/* Button to show password */}
        {inputType === "password" && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
          >
            {isPasswordVisible ? <FiEyeOff /> : <FiEye />}
          </Button>
        )}
      </div>

      {/* Error message and hint */}
      {errorMsg && <FormFieldError message={errorMsg} />}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </>
  );
};
