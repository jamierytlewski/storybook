import { forwardRef } from "react";
import {
  inputDefaultCss,
  inputDefaultRingCss,
  inputValidCss,
} from "../../../css/inputDefaultCss";
import Label from "../Label/Label";

export type Option = {
  value: string;
  name: string;
};

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  options: Option[];
};

export const Dropdown = forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const { options, ...restProps } = props
    const inputGroupClassNames = [...inputDefaultCss, ...inputDefaultRingCss];
    const inputClassNames = ["w-full", "pl-3", "peer"];

    if (restProps.required) {
      inputClassNames.push(...inputValidCss);
    }

    return (
      <div className={`relative ${restProps.className ?? ""}`}>
        <Label
          htmlFor={restProps.id}
          labelText={restProps.label}
          inputType={"dropdown"}
        />
        <div className="flex">
          <select
            ref={ref}
            {...restProps}
            className={inputGroupClassNames.concat(inputClassNames).join(" ")}
          >
            <option value="">{restProps.placeholder}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  },
);

export default Dropdown;
