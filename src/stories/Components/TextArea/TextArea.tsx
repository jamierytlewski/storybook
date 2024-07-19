import { TextareaHTMLAttributes, forwardRef, useState } from "react";
import Label from "../Label/Label";
import {
  inputDefaultRingCss,
  inputValidCss,
} from "../../../css/inputDefaultCss";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  id: string;
  placeholder: string;
  validate?: boolean;
  children?: string;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const [text, setText] = useState<string>(props.children ?? "");

    const charCountList = [
      "absolute",
      "bottom-2.5",
      "right-4",
      "bg-detroitblue-50",
      "px-1",
      "text-sm",
    ];

    if (props.maxLength) {
      if (text.length >= props.maxLength) {
        charCountList.push("text-error-700");
      } else if (text.length / props.maxLength > 0.85) {
        charCountList.push("text-warning-800");
      }
    }

    const classList = [
      "font-medium",
      "rounded",
      "outline-none",
      "disabled:bg-gunmetal-100/50",
      "disabled:text-gunmetal-100/50",
      "border-2",
      "border-detroitblue-500",
      "py-2.5",
      "px-3",
      "w-full",
      ...inputDefaultRingCss,
    ];

    if (props.validate) {
      classList.push(...inputValidCss);
    }

    const textareaProps = { ...props };
    delete textareaProps.children;
    delete textareaProps.validate;

    return (
      <div className="relative">
        <Label inputType="text" htmlFor={props.id} labelText={props.label} />
        <textarea
          ref={ref}
          defaultValue={text}
          {...textareaProps}
          onChange={(event) => {
            setText(event.target.value);
            props.onChange?.(event);
          }}
          className={classList.join(" ")}
        />
        {props.maxLength ? (
          <div className={charCountList.join(" ")}>
            {text.length} / {props.maxLength}
          </div>
        ) : null}
      </div>
    );
  },
);

export default TextArea;
