import { useId } from "react";
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
  const errorId = useId();
  const hintId = useId();
  const describedBy =
    [errorMsg ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") || undefined;

  return (
    <>
      <div className="relative">
        <Textarea
          className={cn(errorMsg && "border-destructive", attrs.className)}
          aria-invalid={errorMsg ? true : undefined}
          aria-describedby={describedBy}
          {...attrs}
          {...registration}
        />
      </div>

      {/* Error message and hint */}
      {errorMsg && <FormFieldError id={errorId} message={errorMsg} />}
      {hint && (
        <p id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
    </>
  );
};
