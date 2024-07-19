import { faX } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropsWithChildren, useState } from "react";
import { Transition } from "@headlessui/react";

type AlertType = "info" | "success" | "error" | "warning";

type AlertProps = {
  type: AlertType;
  isDismissable?: boolean;
};

const Alert = (props: PropsWithChildren<AlertProps>) => {
  const [isShowing, setIsShowing] = useState<boolean>(true);

  const typeToClassMap: Record<AlertType, string> = {
    info: "bg-detroitblue-500",
    success: "bg-success-700",
    error: "bg-red-700",
    warning: "bg-warning-700",
  };

  const classList = [
    "p-3",
    "flex",
    "items-start",
    "justify-between",
    "rounded",
    "text-white",
    typeToClassMap[props.type],
  ];

  return (
    <Transition
      show={isShowing}
      leave="transition-all ease-in-out duration-300"
      leaveFrom="opacity-100 max-h-48"
      leaveTo="opacity-0 py-0 max-h-0"
    >
      <div className={classList.join(" ")} role="alert">
        {props.children}
        {props.isDismissable ? (
          <button
            type="button"
            onClick={() => setIsShowing(false)}
            aria-label="close"
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        ) : null}
      </div>
    </Transition>
  );
};

export default Alert;
