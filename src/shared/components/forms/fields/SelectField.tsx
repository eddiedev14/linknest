import type { UseFormRegisterReturn } from "react-hook-form";
import type { IconType } from "react-icons";
import { NativeSelect, NativeSelectOption } from "../../shadcn/native-select";
import { FormFieldError } from "../FieldError";

export interface SelectOption {
  label: string;
  value: string;
}

interface Props {
  Icon: IconType;
  placeholder?: string;
  disabled?: boolean;
  errorMsg?: string;
  hint?: string;
  options: SelectOption[];
  registration?: UseFormRegisterReturn;
  value: string;
  onChange: (value: string) => void;
}

export const SelectField = ({
  Icon,
  placeholder,
  disabled = false,
  errorMsg,
  hint = "",
  value,
  onChange,
  options,
}: Props) => {
  return (
    <>
      <div className="relative">
        <Icon className="absolute left-3 top-3.75 text-muted-foreground pointer-events-none" />
        <NativeSelect
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        >
          {(!value || value === "") && (
            <NativeSelectOption value="" disabled>
              {placeholder}
            </NativeSelectOption>
          )}
          {options.map((option) => (
            <NativeSelectOption key={option.value} value={option.value}>
              {option.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>

      {/* Error message and hint */}
      {errorMsg && <FormFieldError message={errorMsg} />}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </>
  );
};
