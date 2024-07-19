import { forwardRef, useState } from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/pro-duotone-svg-icons";

import Label from "../Label/Label";
import { inputDefaultRingCss } from "../../../css/inputDefaultCss";

type CheckboxProps = Omit<RadixCheckbox.CheckboxProps, "asChild"> & {
  label: string;
  name: string;
  id: string;
};

const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>((props, ref) => {
  const [checked, setChecked] = useState<RadixCheckbox.CheckedState>(
    props.defaultChecked ?? props.checked ?? false,
  );

  const handleCheckedChange = (checked: boolean) => {
    setChecked(checked);
    props.onCheckedChange?.(checked);
  };

  const classList = [
    "peer",
    "flex",
    "size-5",
    "items-center",
    "justify-center",
    "rounded-sm",
    "border",
    "disabled:opacity-50",
    "disabled:bg-gunmetal-100/30",
    "data-[state=checked]:bg-detroitblue-500",
    "data-[state=checked]:text-white",
    "border-gunmetal-200",
    "outline-none",
    "transition-colors",
    ...inputDefaultRingCss,
  ];

  return (
    <div className={`flex items-center ${props.className ?? ""}`}>
      <RadixCheckbox.Root
        ref={ref}
        {...props}
        checked={props.checked ?? checked}
        onCheckedChange={handleCheckedChange}
        aria-label={props.label}
        className={classList.join(" ")}
      >
        <RadixCheckbox.Indicator>
          <FontAwesomeIcon icon={faCheck} />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>

      <Label htmlFor={props.id} labelText={props.label} inputType="checkbox" />
    </div>
  );
});

export default Checkbox;
