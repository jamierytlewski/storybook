import { forwardRef } from "react";
import { buttonDefaultCss } from "../../../css/buttonDefaultCss";

type ButtonStyle =
  | "primary"
  | "secondary"
  | "tertiary"
  | "detroitblue"
  | "link"
  | "error"
  | "success"
  | "warning"
  | "outline-primary"
  | "outline-secondary"
  | "outline-tertiary"
  | "outline-detroitblue"
  | "outline-error"
  | "outline-success"
  | "outline-warning"
  | "icon-detroitblue"
  | "icon-error"
  | "icon-success"
  | "icon-warning";

type ButtonSize = "xsmall" | "small" | "default" | "icon";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /**
   * What color is the button?
   */
  buttonStyle: ButtonStyle;

  /**
   * What size should I be?
   */
  size: ButtonSize;

  fullWidth?: boolean;
};

/**
 * Primary UI component for user interaction
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const buttonCss = [...buttonDefaultCss];

  if (!props.buttonStyle.includes("icon")) {
    buttonCss.push("border-2");
  }

  const buttonSizeClass: Record<ButtonSize, string[]> = {
    xsmall: ["text-xs", "px-1", "py-0.5"],
    small: ["text-sm", "px-2", "py-1"],
    default: ["text-base", "px-3", "py-1.5"],
    icon: ["text-base"],
  };

  const buttonColorClass: Record<ButtonStyle, string[]> = {
    primary: [
      "bg-darkblue-500",
      "border-darkblue-500",
      "enabled:hover:bg-darkblue-700",
      "enabled:active:bg-darkblue-900",
      "focus-visible:ring-darkblue-500/50",
      "text-white",
    ],
    "outline-primary": [
      "border-darkblue-500",
      "enabled:hover:bg-darkblue-700",
      "enabled:hover:text-white",
      "enabled:active:bg-darkblue-900",
      "focus-visible:ring-darkblue-500/50",
      "focus-visible:bg-darkblue-700",
      "focus-visible:text-white",
      "text-darkblue-500",
    ],
    secondary: [
      "bg-gunmetal-400",
      "border-gunmetal-400",
      "enabled:hover:bg-gunmetal-500",
      "enabled:active:bg-gunmetal-600",
      "focus-visible:ring-gunmetal-400/50",
      "text-white",
    ],
    "outline-secondary": [
      "border-gunmetal-400",
      "enabled:hover:bg-gunmetal-500",
      "enabled:hover:text-white",
      "enabled:active:bg-gunmetal-600",
      "focus-visible:ring-gunmetal-400/50",
      "focus-visible:bg-gunmetal-500",
      "focus-visible:text-white",
      "text-gunmetal-500",
    ],
    tertiary: [
      "bg-bronze-600",
      "border-bronze-600",
      "enabled:hover:bg-bronze-700",
      "enabled:active:bg-bronze-800",
      "focus-visible:ring-bronze-600/50",
      "text-white",
    ],
    "outline-tertiary": [
      "border-bronze-600",
      "enabled:hover:bg-bronze-600",
      "enabled:hover:text-white",
      "enabled:active:bg-bronze-700",
      "focus-visible:bg-bronze-600",
      "focus-visible:ring-bronze-600/50",
      "focus-visible:text-white",
      "text-bronze-600",
    ],
    detroitblue: [
      "bg-detroitblue-500",
      "border-detroitblue-500",
      "enabled:hover:bg-detroitblue-600",
      "enabled:active:bg-detroitblue-700",
      "focus-visible:ring-detroitblue-500/50",
      "text-white",
    ],
    "outline-detroitblue": [
      "border-detroitblue-500",
      "enabled:hover:bg-detroitblue-600",
      "enabled:hover:text-white",
      "enabled:active:bg-detroitblue-700",
      "focus-visible:bg-detroitblue-600",
      "focus-visible:ring-detroitblue-600/50",
      "focus-visible:text-white",
      "text-detroitblue-500",
    ],
    link: [
      "bg-transparent",
      "text-darkblue-500",
      "border-transparent",
      "focus:ring-darkblue-500",
    ],
    error: [
      "bg-error-600",
      "border-error-600",
      "enabled:hover:bg-error-700",
      "enabled:active:bg-error-800",
      "focus-visible:ring-error-600/50",
      "text-white",
    ],
    "outline-error": [
      "border-error-600",
      "enabled:hover:bg-error-700",
      "enabled:hover:text-white",
      "enabled:active:bg-error-800",
      "focus-visible:ring-error-600/50",
      "focus-visible:bg-error-700",
      "focus-visible:text-white",
      "text-error-600",
    ],
    success: [
      "bg-success-700",
      "border-success-700",
      "enabled:hover:bg-success-800",
      "enabled:active:bg-success-900",
      "focus-visible:ring-success-700/50",
      "text-white",
    ],
    "outline-success": [
      "border-success-700",
      "enabled:hover:bg-success-800",
      "enabled:hover:text-white",
      "enabled:active:bg-success-900",
      "focus-visible:ring-success-700/50",
      "focus-visible:bg-success-700",
      "focus-visible:text-white",
      "text-success-700",
    ],
    warning: [
      "bg-warning-500",
      "border-warning-500",
      "enabled:hover:bg-warning-600",
      "enabled:active:bg-warning-700",
      "focus-visible:ring-warning-500/50",
      "text-black",
    ],
    "outline-warning": [
      "border-warning-400",
      "enabled:hover:bg-warning-500",
      "enabled:active:bg-warning-600",
      "focus-visible:ring-warning-400/50",
      "focus-visible:bg-warning-500",
      "focus-visible:text-black",
      "text-warning-700",
      "enabled:hover:text-black",
    ],
    "icon-detroitblue": [
      "hover:text-detroitblue-500",
      "focus-visible:text-detroitblue-500",
    ],
    "icon-error": [
      "text-error-600",
      "hover:text-error-700",
      "focus-visible:text-error-700",
    ],
    "icon-success": [
      "text-success-600",
      "hover:text-success-700",
      "focus-visible:text-success-700",
    ],
    "icon-warning": [
      "text-warning-600",
      "hover:text-warning-700",
      "focus-visible:text-warning-700",
    ],
  };

  const { buttonStyle, size, fullWidth, ...buttonProps } = props;
  delete buttonProps.className;

  return (
    <button
      ref={ref}
      className={
        buttonCss
          .concat(buttonSizeClass[size])
          .concat(buttonColorClass[buttonStyle])
          .join(" ") + (fullWidth ? " w-full" : "")
      }
      {...buttonProps}
    >
      {props.children}
    </button>
  );
});

export default Button;
