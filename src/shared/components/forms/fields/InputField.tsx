import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import type { IconType } from "react-icons";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { Input } from "../../shadcn/input";
import { Button } from "../../shadcn/button";
import { FormFieldError } from "../FieldError";

type InputType = "text" | "number" | "email" | "password";

interface Props {
  Icon: IconType;
  type?: InputType;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  errorMsg?: string;
  hint?: string;
  registration?: UseFormRegisterReturn;
}

export const InputField = ({
  Icon,
  type = "text",
  placeholder,
  disabled = false,
  value,
  errorMsg,
  hint = "",
  registration,
}: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputType: InputType = type !== "password" ? type : isPasswordVisible ? "text" : "password";

  return (
    <>
      <div className="relative">
        <Icon className="absolute left-3 top-3.75 text-muted-foreground pointer-events-none" />
        <Input
          type={inputType}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          className={errorMsg ? "border-destructive pl-8" : "pl-8"}
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
