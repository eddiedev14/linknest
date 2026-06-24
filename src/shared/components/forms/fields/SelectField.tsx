import type { UseFormRegisterReturn } from "react-hook-form";
import type { IconType } from "react-icons";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../shadcn/select";
import { FormFieldError } from "../FieldError";

interface SelectOption {
  label: string;
  value: string;
}

interface Props {
  Icon: IconType;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  errorMsg?: string;
  hint?: string;
  options: SelectOption[];
  registration?: UseFormRegisterReturn;
}

export const SelectField = ({
  Icon,
  placeholder,
  disabled = false,
  value,
  errorMsg,
  hint = "",
  registration,
  options,
}: Props) => {
  return (
    <>
      <div className="relative">
        <Icon className="absolute left-3 top-3.75 text-muted-foreground pointer-events-none" />
        <Select value={value} disabled={disabled} {...registration}>
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
      </div>

      {/* Error message and hint */}
      {errorMsg && <FormFieldError message={errorMsg} />}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </>
  );
};
