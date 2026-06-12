import { useState, type FocusEvent } from "react";

import type { IconType } from "react-icons";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { Input } from "../shadcn/input";
import { Button } from "../shadcn/button";

import { FormFieldError } from "./FormFieldError";

type InputType = "text" | "number" | "email" | "password";

interface Props {
  Icon: IconType;
  id: string;
  type: InputType;
  placeholder?: string;
  errorMsg: string;
  onBlur?: (e: FocusEvent<HTMLInputElement, Element>) => void;
}

export const FormField = ({
  Icon,
  id,
  type,
  placeholder,
  errorMsg,
  onBlur,
}: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputType: InputType =
    type !== "password" ? type : isPasswordVisible ? "text" : "password";

  return (
    <>
      <div className="relative">
        <Icon
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          aria-hidden="true"
        />
        <Input
          type={inputType}
          id={id}
          name={id}
          placeholder={placeholder}
          onBlur={onBlur}
        />

        {/* For a password field */}
        {type === "password" && (
          <Button
            type="button"
            className="absolute right-3 top-1/2 bg-white hover:bg-white -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {!isPasswordVisible ? (
              <FiEye size={15} aria-hidden="true" />
            ) : (
              <FiEyeOff size={15} aria-hidden="true" />
            )}
          </Button>
        )}
      </div>

      {errorMsg && <FormFieldError message={errorMsg} />}
    </>
  );
};
