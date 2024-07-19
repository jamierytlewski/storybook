import { forwardRef } from "react";
import styles from "./Input.module.css";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  inputDefaultCss,
  inputDefaultRingCss,
  inputValidCss,
} from "../../../css/inputDefaultCss";
import Label from "../Label/Label";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
  name: string;
  floatLabel?: boolean;
  placeholder: string;
  leadingIcon?: IconProp;
  trailingIcon?: IconProp;
  validate?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const inputGroupClassNames = [...inputDefaultCss, ...inputDefaultRingCss];
  const inputClassNames = ["w-full", "pl-3", "peer", `${styles.input}`];
  const fontAwesomeClassNames = ["p-3", "absolute", "right-0"];

  if (props.leadingIcon) {
    const index = inputClassNames.indexOf("pl-3");
    inputClassNames[index] = "pl-10";
    fontAwesomeClassNames.push("left-0");
  } else if (props.trailingIcon) {
    fontAwesomeClassNames.push("right-0");
  }

  if (props.validate) {
    inputClassNames.push(...inputValidCss);
  }

  const inputProps = { ...props };
  delete inputProps.floatLabel;
  delete inputProps.className;
  delete inputProps.leadingIcon;
  delete inputProps.trailingIcon;
  delete inputProps.validate;

  return (
    <div
      className={`relative ${styles.inputContainer} ${props.className ?? ""}`}
    >
      <Label
        htmlFor={props.id}
        labelText={props.label}
        inputType={"text"}
        floatLabel={props.floatLabel}
        leadingIcon={props.leadingIcon}
      />
      <div className="flex">
        {props.leadingIcon ? (
          <FontAwesomeIcon
            fixedWidth
            icon={props.leadingIcon}
            className={fontAwesomeClassNames.join(" ")}
          />
        ) : null}
        <input
          ref={ref}
          {...inputProps}
          className={inputGroupClassNames.concat(inputClassNames).join(" ")}
        />
        {props.trailingIcon ? (
          <FontAwesomeIcon
            fixedWidth
            icon={props.trailingIcon}
            className={fontAwesomeClassNames.join(" ")}
          />
        ) : null}
      </div>
    </div>
  );
});

export default Input;
