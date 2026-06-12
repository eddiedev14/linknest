import type { IconType } from "react-icons";
import { FiEye } from "react-icons/fi";
import { Input } from "../shadcn/input";
import { Button } from "../shadcn/button";

interface Props {
  Icon: IconType;
  id: string;
  type: "text" | "number" | "email" | "password";
  placeholder?: string;
}

export const FormField = ({ Icon, id, type, placeholder }: Props) => {
  return (
    <div className="relative">
      <Icon
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        aria-hidden="true"
      />
      <Input type={type} id={id} name={id} placeholder={placeholder} />

      {/* For a password field */}
      {type === "password" && (
        <Button
          type="button"
          className="absolute right-3 top-1/2 bg-white hover:bg-white -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <FiEye size={15} aria-hidden="true" />
        </Button>
      )}
    </div>
  );
};
