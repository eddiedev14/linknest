import { MdError } from "react-icons/md";

interface Props {
  message: string;
}

export const FormFieldError = ({ message }: Props) => {
  return (
    <p className="flex gap-1 text-destructive text-xs">
      <MdError className="shrink-0 mt-0.5" /> {message}
    </p>
  );
};
