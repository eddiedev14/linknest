import type { UseFormRegisterReturn } from "react-hook-form";
import { Textarea } from "../../shadcn/textarea";
import { FormFieldError } from "../FieldError";

interface Props {
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  errorMsg?: string;
  hint?: string;
  registration?: UseFormRegisterReturn;
}

export const TextareaField = ({
  placeholder,
  disabled = false,
  value,
  errorMsg,
  hint = "",
  registration,
}: Props) => {
  return (
    <>
      <div className="relative">
        <Textarea
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          className={errorMsg ? "border-destructive" : ""}
          {...registration}
        />
      </div>

      {/* Error message and hint */}
      {errorMsg && <FormFieldError message={errorMsg} />}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </>
  );
};
