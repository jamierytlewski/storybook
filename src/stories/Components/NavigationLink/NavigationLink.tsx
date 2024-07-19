import { ComponentType, ElementType, PropsWithChildren, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/pro-duotone-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type NavigationLinkProps<P> = P & {
  name: string;
  icon: IconProp;
  as: ComponentType<P> | ElementType;
};

const NavigationLink = <P,>({
  name,
  icon,
  children,
  as: Component,
  ...linkProps
}: PropsWithChildren<NavigationLinkProps<P>>) => {
  const [areChildrenOpen, setAreChildrenOpen] = useState<boolean>(false);

  const parentClassList = [
    "nav-parent",
    "group",
    "flex",
    "items-center",
    "px-4",
    "py-2",
    "mr-2",
    "[.active_&]:border-l-4",
    "[.active_&]:border-bronze-500",
    "[.active_&]:pl-3",
    areChildrenOpen ? "opened" : "closed",
  ];

  const childrenClassList = [
    "nav-children",
    "overflow-hidden",
    areChildrenOpen ? "opened" : "closed",
  ];

  const chevronClassList = ["transition-transform", "duration-300"];

  if (!areChildrenOpen) {
    chevronClassList.push("rotate-180");
  }

  return (
    <>
      <Component {...linkProps}>
        <div
          className={parentClassList.join(" ")}
          onClick={() => children && setAreChildrenOpen((open) => !open)}
        >
          <div className="mr-4 w-5">
            <FontAwesomeIcon icon={icon} fixedWidth />
          </div>
          <span className="grow group-hover:text-detroitblue-100 group-[.active_&]:text-detroitblue-200">
            {name}
          </span>
          {children ? (
            <button
              className={chevronClassList.join(" ")}
              aria-label="toggle secondary navigation"
            >
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          ) : null}
        </div>
      </Component>

      {children ? (
        <div className={childrenClassList.join(" ")}>{children}</div>
      ) : null}
    </>
  );
};

type NavigationLinkChildProps<P> = P & {
  name: string;
  as: ComponentType<P> | ElementType;
};

NavigationLink.Child = <P,>({
  name,
  as: Component,
  ...linkProps
}: NavigationLinkChildProps<P>) => {
  const childClassList = [
    "flex",
    "items-center",
    "ml-6.5",
    "border-l",
    "pl-6.5",
    "h-9",
    "hover:text-detroitblue-100",
    "[&.active]:text-detroitblue-200",
  ];

  return (
    <Component {...linkProps} className={childClassList.join(" ")}>
      {name}
    </Component>
  );
};

export default NavigationLink;
