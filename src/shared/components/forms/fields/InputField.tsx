import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import type { IconType } from "react-icons";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { Input } from "../../shadcn/input";
import { Button } from "../../shadcn/button";
import { FormFieldError } from "../FieldError";

type InputType = React.HTMLInputTypeAttribute;

interface Props {
  Icon: IconType;
  id: string;
  type?: InputType;
  placeholder?: string;
  autoComplete?: React.ComponentProps<"input">["autoComplete"];
  disabled?: boolean;
  errorMsg?: string;
  hint?: string;
  registration?: UseFormRegisterReturn;
  className?: string;
}

export const InputField = ({
  Icon,
  id,
  type = "text",
  placeholder,
  disabled = false,
  autoComplete = "on",
  errorMsg,
  hint = "",
  registration,
  className,
}: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputType: InputType = type !== "password" ? type : isPasswordVisible ? "text" : "password";

  return (
    <>
      <div className="relative">
        <Icon className="absolute left-3 top-3.75 text-muted-foreground pointer-events-none" />
        <Input
          id={id}
          type={inputType}
          autoComplete={autoComplete}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(errorMsg && "border-destructive", className)}
          {...registration}
        />

        {/* Button to show password */}
        {type === "password" && (
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
