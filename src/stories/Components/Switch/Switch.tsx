import { forwardRef, useState } from "react";
import * as RadixSwitch from "@radix-ui/react-switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { inputDefaultRingCss } from "../../../css/inputDefaultCss";
import Label from "../Label/Label";

export type SwitchProps = Omit<RadixSwitch.SwitchProps, "asChild"> & {
  id: string;
  label: string;
  name: string;
  showLabel?: boolean;
  icon?: IconProp;
};

const Switch = forwardRef<HTMLButtonElement, SwitchProps>((props, ref) => {
  const [checked, setChecked] = useState<boolean>(
    props.defaultChecked ?? props.checked ?? false,
  );

  const handleCheck = (checked: boolean) => {
    setChecked(checked);
    props.onCheckedChange?.(checked);
  };

  const backgroundClassList = [
    "w-10",
    "h-6",
    "bg-gunmetal-100",
    "rounded-full",
    "outline-none",
    "cursor-pointer",
    "disabled:cursor-not-allowed",
    "disabled:opacity-70",
    "disabled:data-[state=checked]:opacity-30",
    "data-[state=checked]:bg-detroitblue-500",
    "peer",
    ...inputDefaultRingCss,
  ];

  const circleClassList = [
    "flex",
    "justify-center",
    "items-center",
    "block",
    "w-5",
    "h-5",
    "bg-white",
    "rounded-full",
    "text-sm",
    "shadow-md",
    "transition-transform",
    "translate-x-0.5",
    "data-[state=checked]:translate-x-4.5",
    "data-[disabled]:opacity-70",
  ];

  const buttonProps = { ...props };
  delete buttonProps.icon;
  delete buttonProps.showLabel;

  return (
    <div className="flex items-center">
      <RadixSwitch.Root
        ref={ref}
        {...buttonProps}
        className={backgroundClassList.join(" ")}
        checked={checked}
        onCheckedChange={handleCheck}
        aria-label={props.label}
      >
        <RadixSwitch.Thumb className={circleClassList.join(" ")}>
          {props.icon ? (
            <FontAwesomeIcon
              icon={props.icon}
              className="text-detroitblue-500"
            />
          ) : null}
        </RadixSwitch.Thumb>
      </RadixSwitch.Root>

      {props.showLabel ? (
        <Label
          htmlFor={props.id}
          labelText={props.label}
          inputType={"switch"}
        />
      ) : null}
    </div>
  );
});

export default Switch;
