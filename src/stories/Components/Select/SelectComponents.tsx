import { faChevronDown, faX } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ClearIndicatorProps,
  DropdownIndicatorProps,
  GroupBase,
  MultiValueGenericProps,
  MultiValueRemoveProps,
  components,
} from "react-select";
import { Option } from "../../../models/Option";

export const DropdownIndicator = (
  props: DropdownIndicatorProps<Option, boolean, GroupBase<Option>>,
) => {
  return (
    <components.DropdownIndicator {...props}>
      <FontAwesomeIcon icon={faChevronDown} swapOpacity />
    </components.DropdownIndicator>
  );
};

export const ClearIndicator = (
  props: ClearIndicatorProps<Option, boolean, GroupBase<Option>>,
) => {
  return (
    <components.ClearIndicator {...props}>
      <FontAwesomeIcon title="Clear Selections" icon={faX} swapOpacity />
    </components.ClearIndicator>
  );
};

export const MultiValueContainer = (props: MultiValueGenericProps<Option>) => {
  return (
    <components.MultiValueContainer {...props}>
      <div className="m-1 flex items-center rounded bg-gunmetal-100 pl-2 ">
        {props.children}
      </div>
    </components.MultiValueContainer>
  );
};

export const MultiValueRemove = (
  props: MultiValueRemoveProps<Option, boolean, GroupBase<Option>>,
) => {
  return (
    <components.MultiValueRemove {...props}>
      <FontAwesomeIcon icon={faX} swapOpacity className="h-2 w-2 p-2" />
    </components.MultiValueRemove>
  );
};
