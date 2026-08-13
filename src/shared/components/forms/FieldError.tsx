import { MdError } from "react-icons/md";

interface Props {
  message: string;
  id?: string;
}

export const FormFieldError = ({ message, id }: Props) => {
  return (
    <p id={id} className="flex gap-1 text-destructive text-xs">
      <MdError className="shrink-0 mt-0.5" aria-hidden="true" /> {message}
    </p>
  );
};
