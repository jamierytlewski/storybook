import { forwardRef, useState } from "react";
import { Combobox } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faMagnifyingGlass } from "@fortawesome/pro-duotone-svg-icons";
import {
  inputDefaultCss,
  inputDefaultRingCss,
  inputValidCss,
} from "../../../css/inputDefaultCss";
import Label from "../Label/Label";

type Option = {
  value: string;
  name: string;
};

type AutocompleteProps<T extends Option> =
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    id: string;
    name: string;
    placeholder: string;
    options: T[];
    isLoading?: boolean;
  };

const LoadingSpinner = () => {
  return (
    <svg
      className="-ml-1 mr-3 h-5 w-5 animate-spin text-gunmetal-300"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps<Option>>(
  (props, ref) => {
    const { options, isLoading, ...restProps } = props;
    const [selectedOption, setSelectedOption] = useState<Option[]>([]);
    const [query, setQuery] = useState("");

    const inputGroupClassNames = [...inputDefaultCss, ...inputDefaultRingCss];
    const inputClassNames = ["w-full", "p-2", "peer", "text-left", "h-auto"];

    if (props.required) {
      inputClassNames.push(...inputValidCss);
    }

    const filteredOptions =
      query === ""
        ? options
        : options.filter((option) =>
            option.name
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, "")),
          );

    return (
      <>
        <Label htmlFor={props.id} labelText={props.label} inputType="text" />
        <Combobox
          value={selectedOption}
          onChange={(event) => setSelectedOption(event)}
          multiple
        >
          <div className="relative">
            <div>
              <Combobox.Input
                ref={ref}
                className={inputGroupClassNames
                  .concat(inputClassNames)
                  .join(" ")}
                onChange={(event) => setQuery(event.target.value)}
                displayValue={() =>
                  selectedOption.map((option) => option.name).join(", ")
                }
                {...restProps}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                )}
              </Combobox.Button>
            </div>

            <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded border border-gunmetal-100 bg-white">
              {filteredOptions.length === 0 && query !== "" ? (
                <p className="relative select-none p-2">Nothing found.</p>
              ) : (
                filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option.value}
                    className="relative select-none py-1 pl-10 ui-active:bg-detroitblue-100"
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <span className="ui-selected:font-semibold">
                          {option.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-detroitblue-500">
                            <FontAwesomeIcon icon={faCheck} />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </div>
        </Combobox>
      </>
    );
  },
);

export default Autocomplete;
