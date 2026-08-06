import type { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Textarea } from "../../shadcn/textarea";
import { FormFieldError } from "../FieldError";

interface Props {
  id: string;
  placeholder?: string;
  disabled?: boolean;
  errorMsg?: string;
  hint?: string;
  registration?: UseFormRegisterReturn;
  classname?: string;
}

export const TextareaField = ({
  id,
  placeholder,
  disabled = false,
  errorMsg,
  hint = "",
  registration,
  classname,
}: Props) => {
  return (
    <>
      <div className="relative">
        <Textarea
          id={id}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(errorMsg && "border-destructive", classname)}
          {...registration}
        />
      </div>

      {/* Error message and hint */}
      {errorMsg && <FormFieldError message={errorMsg} />}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </>
  );
};
