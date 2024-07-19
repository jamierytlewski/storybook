import { RefObject, useEffect, useRef, useState } from "react";
import { CheckedState } from "@radix-ui/react-checkbox";
import {
  faEnvelope,
  faGunSquirt,
  faMitten,
  faSquareX,
  faSwordLaser,
  faTypewriter,
} from "@fortawesome/pro-duotone-svg-icons";
import Button from "../../Components/Button/Button";
import Checkbox from "../../Components/Checkbox/Checkbox";
import Dropdown from "../../Components/Dropdown/Dropdown";
import Input from "../../Components/Input/Input";
import Radio from "../../Components/Radio/Radio";
import Select from "../../Components/Select/Select";
import Switch from "../../Components/Switch/Switch";
import ValidationError from "../../Components/ValidationError/ValidationError";
import TextArea from "../../Components/TextArea/TextArea";

type InputValidations = {
  firstName: {
    message: string;
    value: string;
  };
  email: {
    message: string;
    value: string;
  };
  number: {
    message: string;
    value: string;
  };
  emailValid: {
    message: string;
    value: string;
  };
  numberValid: {
    message: string;
    value: string;
  };
  agree: {
    message: string;
    value: boolean;
  };
  dropdownValid: {
    message: string;
    value: string;
  };
  multiSelectValid: {
    message: string;
    value: string;
  };
};

const InputPage = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const numberRef = useRef<HTMLInputElement>(null);
  const emailValidRef = useRef<HTMLInputElement>(null);
  const agreeRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLSelectElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [formState, setFormState] = useState<InputValidations>({
    firstName: {
      message: "",
      value: "",
    },
    email: {
      message: "",
      value: "",
    },
    number: {
      message: "",
      value: "12",
    },
    emailValid: {
      message: "",
      value: "",
    },
    numberValid: {
      message: "",
      value: "",
    },
    agree: {
      message: "",
      value: false,
    },
    dropdownValid: {
      message: "",
      value: "",
    },
    multiSelectValid: {
      message: "",
      value: "",
    },
  });

  const [disableFormButton, setDisableFormButton] = useState<boolean>(true);

  const formChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    e.currentTarget.setCustomValidity("");
    e.target.checkValidity();
    const newFormState = {
      ...formState,
      [e.target.id]: {
        message: e.target.validationMessage,
        value: e.target.value,
      },
    };

    setFormState(newFormState);
  };

  const checkboxChange = (
    ref: RefObject<HTMLButtonElement>,
    checked: CheckedState,
  ) => {
    if (ref.current) {
      ref.current.checkValidity();
      setFormState({
        ...formState,
        [ref.current.id]: {
          message: ref.current.validationMessage,
          value: checked,
        },
      });
    }
  };

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // check for disabled state from formState
  useEffect(() => {
    setDisableFormButton(
      Object.values(formState).some((input) => !!input.message.length),
    );
  }, [formState]);

  return (
    <div className="container mx-auto">
      <form onSubmit={formSubmit}>
        <div className="mb-10">
          <p className="text-md text-gunmetal-500">Default</p>
          <Input
            label="First Name"
            id="firstName"
            name="firstName"
            required
            placeholder={"John"}
            ref={firstNameRef}
            onChange={formChange}
            minLength={2}
            value={formState.firstName.value}
          />
        </div>

        <div className="mb-10">
          <p className="text-md text-gunmetal-500">Floating Label</p>
          <Input
            label="Email"
            id="email"
            name="email"
            required
            type="email"
            placeholder={"skeletor@rytlew.ski"}
            ref={emailRef}
            onChange={formChange}
            value={formState.email.value}
            floatLabel
          />
        </div>

        <div className="mb-10">
          <p className="text-md text-gunmetal-500">Default Filled</p>
          <Input
            floatLabel
            label="Enter a number (floating label)"
            id="number"
            name="number"
            required
            placeholder={"skeletor@rytlew.ski"}
            ref={numberRef}
            onChange={formChange}
            pattern="\d{3}"
            onInvalid={(e) => {
              e.currentTarget.setCustomValidity(
                "Please enter a 3 digit number",
              );
            }}
            value={formState.number.value}
          />
        </div>

        <div className="mb-10">
          <p className="text-md text-gunmetal-500">Disabled</p>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                label="Enter a number"
                id="disabled"
                name="disabled"
                required
                placeholder={"skeletor@rytlew.ski"}
                ref={numberRef}
                pattern="\d{3}"
                onInvalid={(e) => {
                  e.currentTarget.setCustomValidity(
                    "Please enter a 3 digit number",
                  );
                }}
                disabled
                value={""}
              />
            </div>
            <div className="flex-1">
              <Input
                label="Enter a number"
                id="disabledFilled"
                name="disabledFilled"
                required
                placeholder={"skeletor@rytlew.ski"}
                ref={numberRef}
                pattern="\d{3}"
                onInvalid={(e) => {
                  e.currentTarget.setCustomValidity(
                    "Please enter a 3 digit number",
                  );
                }}
                disabled
                value={formState.number.value}
              />
            </div>
          </div>
        </div>

        <div className="mb-10">
          <p className="text-md text-gunmetal-500">Error and Success states</p>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                label="Email address"
                id="emailValid"
                name="emailValid"
                required
                placeholder={"skeletor@rytlew.ski"}
                ref={emailValidRef}
                onChange={formChange}
                value={formState.emailValid.value}
                validate
                type="email"
              />
              <ValidationError message={formState.emailValid.message} />
            </div>
            <div className="flex-1">
              <Input
                label="Enter a 3 digit number"
                id="numberValid"
                name="numberValid"
                required
                placeholder={"skeletor@rytlew.ski"}
                ref={numberRef}
                onChange={formChange}
                pattern="\d{3}"
                onInvalid={(e) => {
                  e.currentTarget.setCustomValidity(
                    "Please enter a 3 digit number",
                  );
                }}
                validate
                value={formState.numberValid.value}
              />
              <ValidationError message={formState.numberValid.message} />
            </div>
          </div>
        </div>

        <div className="mb-10">
          <p className="text-md text-gunmetal-500">
            Leading and Trailing Icons
          </p>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                label="Label Text"
                id="leadingIcon"
                name="leadingIcon"
                placeholder={"skeletor@rytlew.ski"}
                ref={emailValidRef}
                onChange={formChange}
                type="email"
                leadingIcon={faGunSquirt}
              />
            </div>
            <div className="flex-1">
              <Input
                label="Shipment Number"
                id="trailingIcon"
                name="trailingIcon"
                placeholder={"0000-0000"}
                ref={numberRef}
                onChange={formChange}
                trailingIcon={faMitten}
              />
            </div>
          </div>
        </div>

        <div className="mb-10">
          <p className="text-md text-gunmetal-500">Text Area</p>
          <TextArea
            ref={textareaRef}
            label="Note #1"
            id="textArea"
            name="textArea"
            placeholder="Enter your note here"
            maxLength={1000}
            onChange={formChange}
          />
        </div>

        <div className="mb-10 flex gap-3">
          <Switch
            label="Sign up for Emails"
            name="testSwitch"
            id="testSwitch"
            defaultChecked={false}
            icon={faEnvelope}
            showLabel={true}
          />
          <Switch
            label="Be One With The Force"
            name="testSwitch2"
            id="testSwitch2"
            defaultChecked={true}
            icon={faSwordLaser}
            showLabel={true}
          />
          <Switch
            label="Square with an X"
            name="testSwitch3"
            id="testSwitch3"
            defaultChecked={false}
            disabled={true}
            icon={faSquareX}
            showLabel={true}
          />
          <Switch
            label="Typewriter Magic"
            name="testSwitch4"
            id="testSwitch4"
            defaultChecked={true}
            disabled={true}
            icon={faTypewriter}
            showLabel={true}
          />
        </div>

        <div className="mb-4">
          <Checkbox
            label="I agree to the terms and conditions"
            id="agree"
            name="agree"
            onCheckedChange={(checked) => checkboxChange(agreeRef, checked)}
            ref={agreeRef}
            checked={formState.agree.value}
          />
        </div>

        <Button
          type="submit"
          buttonStyle="primary"
          size="small"
          disabled={disableFormButton || !formState.agree.value}
        >
          Submit
        </Button>

        <div className="mt-10">
          <p className="text-md text-gunmetal-500">MultiSelect menu</p>
          <Select
            isAsync={false}
            isMulti
            required
            label="Favorite Ice Cream Flavors"
            id="multiSelectValid"
            name="multiSelectValid"
            placeholder="Choose your flavor(s)"
            options={[
              { value: "chocolate", label: "Chocolate" },
              { value: "strawberry", label: "Strawberry" },
              { value: "vanilla", label: "Vanilla" },
            ]}
            onChange={() => {}}
          ></Select>
          <ValidationError message={formState.multiSelectValid.message} />
        </div>

        <div className="mt-10">
          <p className="text-md text-gunmetal-500">Dropdown menu</p>
          <Dropdown
            label={"Choose your fighter"}
            id="dropdownValid"
            name="dropdownValid"
            required
            placeholder="Choose wisely..."
            ref={dropdownRef}
            onChange={formChange}
            options={[
              { value: "subzero", name: "Sub-Zero" },
              { value: "scorpion", name: "Scorpion" },
              { value: "liukang", name: "Liu Kang" },
              { value: "johnnycage", name: "Johnny Cage" },
            ]}
          ></Dropdown>
          <ValidationError message={formState.dropdownValid.message} />
        </div>

        <div className="mb-10 mt-10">
          <p className="text-md text-gunmetal-500">Radio</p>
          <div className="mt-2 flex justify-between">
            <Radio name="pickupDate4" id="pickupDate4" label="Pickup Date" />
            <Radio
              name="pickupDate4"
              id="dropoffDate"
              label="Dropoff Date"
              disabled
            />
            <Radio name="pickupDate4" id="etCetera2" label="Et Cetera" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputPage;
