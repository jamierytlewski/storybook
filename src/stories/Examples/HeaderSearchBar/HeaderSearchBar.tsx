import {
  faFilter,
  faFilterSlash,
  faXmark,
} from "@fortawesome/pro-duotone-svg-icons";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  inputDefaultCss,
  inputDefaultRingCss,
} from "../../../css/inputDefaultCss";
import styles from "../../Components/Input/Input.module.css";
import { faSearch } from "@fortawesome/pro-light-svg-icons";
import Label from "../../Components/Label/Label";
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from "../../..";
/**
 * Header SearchBar
 */

function HeaderSearchBar() {
  const [filter, setFilter] = useState<FormData>();
  const [openFilter, setOpenFilter] = useState(false);
  const [openSearchResults, setOpenSearchResults] = useState(false);

  const radiusRef = useRef<HTMLInputElement>(null);

  const setFilterValues = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setFilter(formData);
    setOpenFilter(false);
  };

  const clearFilter = () => {
    setFilter(undefined);
  };

  const searchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpenSearchResults(true);
  };

  const setFilterForm = () => {
    if (radiusRef?.current) {
      radiusRef.current.value = (filter?.get("radius") as string) ?? "";
    }
  };

  let inputGroupClassNames = [...inputDefaultCss, ...inputDefaultRingCss];
  const inputClassNames = ["w-full", "pl-3", `${styles.input}`];

  inputGroupClassNames = inputGroupClassNames.filter(
    (className) =>
      className !== "rounded" && className !== "focus-visible:ring-2",
  );

  inputGroupClassNames.push("rounded-l");
  inputGroupClassNames.push("border-r-0");

  return (
    <div className="relative flex grow gap-2">
      <Popover open={openSearchResults}>
        <PopoverTrigger asChild>
          <div className="flex-1">
            <form onSubmit={searchSubmit}>
              <div className={`relative ${styles.inputContainer}`}>
                <Label
                  htmlFor="navSearch"
                  labelText={"Search"}
                  inputType={"text"}
                  floatLabel={true}
                />
                <div className="flex">
                  <input
                    placeholder="Search"
                    id="navSearch"
                    name="navSearch"
                    className={inputGroupClassNames
                      .concat(inputClassNames)
                      .join(" ")}
                  />
                  <button
                    className="h-10 w-10 rounded-r border-y-2 border-r-2 border-detroitblue-500 
        bg-detroitblue-500
        text-white
        hover:bg-detroitblue-600 
        focus:bg-detroitblue-600 
        focus:outline-none
        focus-visible:outline-none
        focus-visible:ring-2 
        focus-visible:ring-darkblue-500/50
        active:bg-detroitblue-700"
                    title="Search"
                  >
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="h-4 w-4"
                      fixedWidth
                    />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </PopoverTrigger>

        <PopoverContent
          onInteractOutside={() => setOpenSearchResults(false)}
          matchTriggerWidth
        >
          <div className="flex w-full flex-col gap-2.5">
            <p className="font-medium">Search Results</p>
          </div>
        </PopoverContent>

      </Popover>
      <div>
        <Popover open={openFilter}>
          <PopoverTrigger asChild>
            <Button
              buttonStyle={!filter ? "outline-primary" : "primary"}
              size={"default"}
              onClick={() => setOpenFilter(!openFilter)}
            >
              <FontAwesomeIcon
                icon={!filter ? faFilterSlash : faFilter}
                fixedWidth
                className="mr-2"
                swapOpacity={filter !== undefined}
              />
              Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent
            onOpenAutoFocus={setFilterForm}
            onInteractOutside={() => setOpenFilter(false)}
            onEscapeKeyDown={() => setOpenFilter(false)}
          >
            <div className="flex flex-col gap-2.5">
              <p className="font-medium">Filter</p>
              <form onSubmit={setFilterValues}>
                <div className="flex flex-col gap-2.5">
                  <Input
                    label="Radius"
                    name={"radius"}
                    placeholder={"Radius"}
                    id={"radius"}
                    floatLabel
                    defaultValue={0}
                    ref={radiusRef}
                  />
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Button
                        buttonStyle={"primary"}
                        size={"small"}
                        fullWidth
                      >
                        Set Filter
                      </Button>
                    </div>
                    <div className="flex-1">
                      <Button
                        buttonStyle={"outline-secondary"}
                        size={"small"}
                        type="reset"
                        onClick={clearFilter}
                        fullWidth
                      >
                        Clear Filter
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <PopoverClose
              className="hover:bg-violet4 focus:shadow-violet7 absolute right-2 top-2 inline-flex cursor-default items-center justify-center rounded-full outline-none focus:shadow-[0_0_0_2px]"
              aria-label="Close"
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="cursor-pointer"
                swapOpacity
                fixedWidth
              />
            </PopoverClose>
          </PopoverContent>

        </Popover>
      </div>
    </div>
  );
}

export default HeaderSearchBar;
