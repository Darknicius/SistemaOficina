import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  size?: "sm" | "md";
  variant?: "primary" | "outline";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  iconOnly?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
  iconOnly = false,
  type = "button",
}) => {
  const base = [
    "inline-flex items-center justify-center gap-2",
    "rounded-lg font-medium select-none",
    "transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  ].join(" ");

  const sizeClasses = {
    sm: "px-4 py-2.5 text-sm",
    md: "px-5 py-3 text-sm",
  };

  const variantClasses = {
    primary: [
      "bg-brand-600 text-white shadow-sm",
      "focus-visible:ring-brand-500",
      "disabled:bg-brand-300 disabled:shadow-none",
      !iconOnly && "hover:bg-brand-700 hover:scale-[1.03] hover:shadow-md",
      iconOnly && "hover:bg-brand-700 hover:scale-[1.03] hover:shadow-md",
      "active:scale-[0.97] active:brightness-95 active:shadow-none",
    ].filter(Boolean).join(" "),

    outline: [
      "bg-white text-gray-700 shadow-sm",
      "ring-1 ring-inset ring-gray-300",
      "focus-visible:ring-brand-500",
      "dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700",
      !iconOnly && "hover:bg-gray-50 hover:scale-[1.03] hover:shadow-md hover:ring-gray-400",
      iconOnly && "hover:bg-gray-50",
      "active:scale-[0.97] active:shadow-none active:bg-gray-100",
      "dark:hover:bg-white/[0.05] dark:hover:ring-gray-500",
    ].filter(Boolean).join(" "),
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        base,
        iconOnly ? "p-2" : sizeClasses[size],
        variantClasses[variant],
        disabled ? "cursor-not-allowed opacity-50 pointer-events-none" : "",
        className,
      ].join(" ")}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};

export default Button;