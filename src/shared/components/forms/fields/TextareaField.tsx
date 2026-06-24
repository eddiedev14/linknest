import type { UseFormRegisterReturn } from "react-hook-form";
import { Textarea } from "../../shadcn/textarea";
import { FormFieldError } from "../FieldError";

interface Props {
  placeholder?: string;
  disabled?: boolean;
  errorMsg?: string;
  hint?: string;
  registration?: UseFormRegisterReturn;
}

export const TextareaField = ({
  placeholder,
  disabled = false,
  errorMsg,
  hint = "",
  registration,
}: Props) => {
  return (
    <>
      <div className="relative">
        <Textarea
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
