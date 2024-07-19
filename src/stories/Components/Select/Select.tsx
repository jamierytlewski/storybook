import { forwardRef } from "react";
import Label from "../Label/Label";
import ReactSelect, {
  ActionMeta,
  CSSObjectWithLabel,
  GroupBase,
  MultiValue,
  SelectInstance,
  SingleValue,
} from "react-select";
import ReactAsyncSelect from "react-select/async";
import debounce from "lodash/debounce";

import {
  multiSelectDefaultCss,
  multiSelectDefaultRingCss,
} from "../../../css/inputDefaultCss";
import {
  ClearIndicator,
  DropdownIndicator,
  MultiValueContainer,
  MultiValueRemove,
} from "./SelectComponents";
import {
  placeholderStyles,
  singleValueStyles,
  inputStyles,
  dropdownIndicatorStyles,
  indicatorSeperatorStyles,
  clearIndicatorStyles,
  menuListStyles,
  optionStyles,
  noOptionsMessageStyles,
} from "./selectCustomStyles";

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  isAsync: boolean;
  required?: boolean;
  label: string;
  id: string;
  name: string;
  placeholder: string;
  options?: Option[];
  loadOptions?: (
    inputValue: string,
    callback: (options: Option[]) => void,
  ) => void;
  isMulti?: boolean;
  disabled?: boolean;
  defaultValue?: Option | Option[];
  onChange: (selectedValues: Option[], actionMeta: ActionMeta<Option>) => void;
};

const Select = forwardRef<
  SelectInstance<Option, boolean, GroupBase<Option>>,
  SelectProps
>((props, ref) => {
  let handleChange: (
    option: SingleValue<Option> | MultiValue<Option>,
    actionMeta: ActionMeta<Option>,
  ) => void;

  const inputGroupClassNames = [...multiSelectDefaultCss];
  const inputClassNames = ["peer"];

  if (props.isMulti) {
    handleChange = (
      option: SingleValue<Option> | MultiValue<Option>,
      actionMeta: ActionMeta<Option>,
    ) => {
      const selectedValues = (option as Option[]) ?? [];
      props.onChange(selectedValues, actionMeta);
    };
  } else {
    handleChange = (
      option: SingleValue<Option> | MultiValue<Option>,
      actionMeta: ActionMeta<Option>,
    ) => {
      const selectedValue = (option as Option) ?? "";
      props.onChange(selectedValue ? [selectedValue] : [], actionMeta);
    };
  }

  const controlStyles = {
    base: inputGroupClassNames.concat(inputClassNames).join(" "),
    focus: inputGroupClassNames
      .concat(multiSelectDefaultRingCss, inputClassNames)
      .join(" "),
  };

  const debouncedLoadOptions = debounce(
    (inputValue: string, callback: (options: Option[]) => void) => {
      props.loadOptions?.(inputValue, callback);
    },
    400,
  );

  const commonSelectProps = {
    unstyled: true,
    defaultValue: props.defaultValue,
    inputId: props.id,
    closeMenuOnSelect: !props.isMulti,
    required: props.required,
    placeholder: props.placeholder,
    isMulti: props.isMulti,
    isDisabled: props.disabled,
    name: props.name,
    onChange: handleChange,
    components: {
      DropdownIndicator,
      ClearIndicator,
      MultiValueRemove,
      MultiValueContainer,
    },
    styles: {
      control: (provided: CSSObjectWithLabel) => ({
        ...provided,
        minHeight: "2.5rem",
      }),
    },
    classNames: {
      control: ({ isFocused }: { isFocused: boolean }) =>
        `${controlStyles.base} ${isFocused ? controlStyles.focus : ""}`,
      placeholder: () => placeholderStyles,
      singleValue: () => singleValueStyles,
      input: () => inputStyles,
      dropdownIndicator: () => dropdownIndicatorStyles,
      indicatorSeparator: () => indicatorSeperatorStyles,
      clearIndicator: () => clearIndicatorStyles,
      menuList: () => menuListStyles,
      option: () => optionStyles,
      noOptionsMessage: () => noOptionsMessageStyles,
    },
  };

  return (
    <>
      <Label htmlFor={props.id} labelText={props.label} inputType="dropdown" />

      {props.isAsync ? (
        <ReactAsyncSelect
          ref={ref}
          {...commonSelectProps}
          loadOptions={debouncedLoadOptions}
          cacheOptions
          defaultOptions
        />
      ) : (
        <ReactSelect ref={ref} {...commonSelectProps} options={props.options} />
      )}
    </>
  );
});

export default Select;
