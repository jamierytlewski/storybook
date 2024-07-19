import { forwardRef } from "react";
import {
  inputDefaultRingCss,
  inputValidCss,
} from "../../../css/inputDefaultCss"

import type { Option } from "../Dropdown/Dropdown";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  id: string;
  name: string;
  options: Option[];
};

const TableDropdown = forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const inputGroupClassNames = [...inputDefaultRingCss];
    const inputClassNames = ["w-full", "pl-3", "peer", "mt-4"];


    if (props.required) {
      inputClassNames.push(...inputValidCss);
    }

    const inputProps: Partial<SelectProps> = { ...props };
    delete inputProps.options;

    return (

      <div className="flex flex-col text-sm font-medium">
        <label className="border-b" htmlFor={props.id}>{props.label}</label>
        <div>
          <select
            ref={ref}
            {...inputProps}
            name={props.name}
            className={inputGroupClassNames.concat(inputClassNames).join(" ")}
          >
            {props.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name} Rows
              </option>
            ))}
          </select>

        </div>
      </div>
    );
  }
);

export default TableDropdown;
