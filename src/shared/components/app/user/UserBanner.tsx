import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const UserBanner = ({ children, className, style }: Props) => {
  return (
    <div
      className={cn("relative h-32 w-full", className)}
      style={style}
      role={children ? undefined : "img"}
      aria-label={children ? undefined : "Profile banner"}
    >
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
        aria-hidden="true"
      />

      {children}
    </div>
  );
};
