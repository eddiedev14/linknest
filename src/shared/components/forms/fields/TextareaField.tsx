import type { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Textarea } from "../../shadcn/textarea";
import { FormFieldError } from "../FieldError";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorMsg?: string;
  hint?: string;
  registration?: UseFormRegisterReturn;
}

export const TextareaField = ({ errorMsg, hint, registration, ...attrs }: Props) => {
  return (
    <>
      <div className="relative">
        <Textarea
          className={cn(errorMsg && "border-destructive", attrs.className)}
          {...attrs}
          {...registration}
        />
      </div>

      {/* Error message and hint */}
      {errorMsg && <FormFieldError message={errorMsg} />}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </>
  );
};
