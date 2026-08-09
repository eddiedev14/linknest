import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";
import { NativeSelect, NativeSelectOption } from "../../shadcn/native-select";
import { FormFieldError } from "../FieldError";

export interface SelectOption {
  label: string;
  value: string;
}

interface Props extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "size"> {
  Icon: IconType;
  placeholder: string;
  errorMsg?: string;
  hint?: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

export const SelectField = ({ Icon, errorMsg, hint, options, onChange, ...attrs }: Props) => {
  return (
    <>
      <div className="relative">
        <Icon className="absolute left-3 top-3.75 text-muted-foreground pointer-events-none" />
        <NativeSelect
          className={cn(errorMsg && "border-destructive", attrs.className)}
          onChange={(e) => onChange(e.target.value)}
          {...attrs}
        >
          {!attrs.value && (
            <NativeSelectOption value="" disabled>
              {attrs.placeholder}
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
