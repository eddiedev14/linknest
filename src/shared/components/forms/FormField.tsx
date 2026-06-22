import { useState, type FocusEvent } from "react";

import type { IconType } from "react-icons";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { Input } from "../shadcn/input";
import { Textarea } from "../shadcn/textarea";
import { Button } from "../shadcn/button";

import { FormFieldError } from "./FormFieldError";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shadcn/select";

// ? Types and Interfaces
type FieldVariant = "input" | "textarea" | "select";
type InputType = "text" | "number" | "email" | "password";

export interface SelectOption {
  label: string;
  value: string;
}

interface Props {
  Icon: IconType;
  id: string;
  variant?: FieldVariant;
  type?: InputType;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  errorMsg?: string;
  hint?: string;
  options?: SelectOption[];
  onBlur?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChange?: (value: string, name: string) => void;
}

export const FormField = ({
  Icon,
  id,
  variant = "input",
  type = "text",
  placeholder,
  disabled = false,
  value,
  errorMsg,
  hint = "",
  options = [],
  onBlur,
  onChange,
}: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputType: InputType = type !== "password" ? type : isPasswordVisible ? "text" : "password";

  return (
    <>
      <div className="relative">
        {/* Icon */}
        {variant !== "textarea" && (
          <Icon className="absolute left-3 top-3.75 text-muted-foreground pointer-events-none" />
        )}

        {/* Field */}
        {variant === "input" && (
          <Input
            id={id}
            name={id}
            type={inputType}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            onBlur={onBlur}
            onChange={(e) => onChange?.(e.target.value, id)}
            className={errorMsg ? "border-destructive pl-8" : "pl-8"}
          />
        )}

        {variant === "textarea" && (
          <Textarea
            id={id}
            name={id}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            onBlur={onBlur}
            onChange={(e) => onChange?.(e.target.value, id)}
            className={errorMsg ? "border-destructive" : ""}
          />
        )}

        {variant === "select" && (
          <Select
            name={id}
            value={value}
            disabled={disabled}
            onValueChange={(val) => onChange?.(val, id)}
          >
            <SelectTrigger className={errorMsg ? "border-destructive pl-8" : "pl-8"}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Button to show password */}
        {variant === "input" && type === "password" && (
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
