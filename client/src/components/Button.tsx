import React from "react";
type ButtonProps = {
  onClick: () => void;
  color?: string;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"button">;
export default function Button({
  onClick,
  children,
  color = "neutral-100",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`px-3 py-2 border-solid rounded-md text-${color}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
