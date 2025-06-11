// components/profile-components/Button.tsx
import React from "react";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  color?: string; // Can be Tailwind color name or hex code
  textColor?: string;
  borderRadius?: "sm" | "md" | "lg" | "full";
  disabled?: boolean;
};

const radiusClasses: Record<string, string> = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  color = "#000000",
  textColor = "#ffffff",
  borderRadius = "full",
  disabled = false,
}) => {
  const isHex = /^#([0-9A-F]{3}){1,2}$/i.test(color);

  const style = isHex
    ? {
        backgroundColor: color,
        color: textColor,
      }
    : {}; // fallback to Tailwind

  const fallbackColorClass = {
    blue: "bg-blue-600 text-white",
    green: "bg-green-600 text-white",
    red: "bg-red-600 text-white",
    gray: "bg-gray-300 text-black",
    black: "bg-black text-white",
  }[color] || "bg-black text-white";

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 ${isHex ? "" : fallbackColorClass} ${
        radiusClasses[borderRadius]
      } disabled:opacity-50`}
      style={isHex ? style : {}}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
