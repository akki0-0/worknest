import Image from "next/image";
import React, { CSSProperties, MouseEventHandler } from "react";

export default function Button({
  children,
  buttonType,
  onClick,
  disabled,
  isLoading,
  style,
  startIcon = {
    iconType: "image",
    iconColor: "#FFFFFF",
    iconDimension: 24,
    svg: "",
    image: "",
  },
  endIcon = {
    iconType: "image",
    iconColor: "#FFFFFF",
    iconDimension: 24,
    svg: "",
    image: "",
  },
  className,
}: {
  children: React.ReactNode;
  buttonType: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  isLoading?: boolean;
  style?: CSSProperties;
  startIcon?: {
    iconType: "image" | "svg";
    image?: string;
    svg?: React.ReactNode;
    iconDimension?: number;
    iconColor?: string;
  };
  endIcon?: {
    iconType: "image" | "svg";
    image?: string;
    svg?: React.ReactNode;
    iconDimension?: number;
    iconColor?: string;
  };
  className?: string;
}) {
  return (
    <button
      type={buttonType || "submit"}
      className={className}
      onClick={onClick}
      disabled={disabled || isLoading}
      style={{
        display: "flex",
        fontWeight: "600",
        fontFamily: "Inter",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        cursor: disabled || isLoading ? "not-allowed" : "pointer",
        opacity: disabled || isLoading ? 0.9 : 1,
        ...style,
      }}
    >
      {startIcon && startIcon.iconType === "image" && startIcon.image ? (
        <Image
          src={startIcon.image}
          width={startIcon.iconDimension}
          height={startIcon.iconDimension}
          alt={startIcon.image}
        />
      ) : (
        startIcon.svg
      )}
      {children}
      {endIcon && endIcon.iconType === "image" && endIcon.image ? (
        <Image
          src={endIcon.image}
          width={endIcon.iconDimension}
          height={endIcon.iconDimension}
          alt={endIcon.image}
        />
      ) : (
        endIcon.svg
      )}
      {isLoading && (
        <div className="flex space-x-2 justify-center items-center">
          <div className="h-1 w-1 bg-background rounded-full animate-pulse"></div>
          <div className="h-1 w-1 bg-background rounded-full animate-pulse [animation-delay:0.2s]"></div>
          <div className="h-1 w-1 bg-background rounded-full animate-pulse [animation-delay:0.4s]"></div>
        </div>
      )}
    </button>
  );
}
