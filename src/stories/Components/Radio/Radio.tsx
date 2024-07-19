import { forwardRef } from "react";
import { inputDefaultRingCss } from "../../../css/inputDefaultCss";
import Label from "../Label/Label";

type RadioProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  id: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const inputProps = { ...props };
  delete inputProps.className;

  const inputClassNames = [
    "appearance-none",
    "rounded-full",
    "border",
    "border-solid",
    "border-gunmetal-100",
    "mr-2",
    "w-4",
    "h-4",
    "outline-none",
    "peer",
    "checked:border-4",
    "checked:border-detroitblue-100",
    "checked:bg-detroitblue-500",
    ...inputDefaultRingCss,
  ]

  return (
    <div className={'flex'}>
      <input
        type="radio"
        ref={ref}
        {...inputProps}
        className={inputClassNames.join(" ")}
      />
      <Label htmlFor={props.id} labelText={props.label} />
    </div>
  );
});

export default Radio;
