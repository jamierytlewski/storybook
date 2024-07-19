import { IconProp } from "@fortawesome/fontawesome-svg-core";
import textInputStyles from "../Input/Input.module.css";

type Props = {
  htmlFor: string;
  labelText: string;
  inputType?: "checkbox" | "dropdown" | "text" | "switch";
  floatLabel?: boolean;
  leadingIcon?: IconProp;
};

const Label = (props: Props) => {
  const labelClassNames = [
    "leading-none",
    "peer-disabled:opacity-50",
    "peer-disabled:cursor-not-allowed",
    "font-medium",
  ];

  const inputLabelClassNames = ["mb-2", "inline-block"];

  const dropdownLabelClassNames = ["mb-2", "inline-block"];

  const switchLabelClassNames = ["ml-2"];

  switch (props.inputType) {
    case "text":
      labelClassNames.push(...inputLabelClassNames);
      break;
    case "dropdown":
      labelClassNames.push(...dropdownLabelClassNames);
      break;
    case "switch":
    case "checkbox":
      labelClassNames.push(...switchLabelClassNames);
      break;
  }

  if (props.floatLabel) {
    labelClassNames.push(
      `${textInputStyles.floatLabel}`,
      "absolute",
      "top-0",
      "left-0",
      "pl-2.5",
      "py-3",
    );
  }

  if (props.leadingIcon) {
    labelClassNames.push(`${textInputStyles.leadingIcon}`);
  }

  return (
    <label htmlFor={props.htmlFor} className={labelClassNames.join(" ")}>
      {props.labelText}
    </label>
  );
};

export default Label;
