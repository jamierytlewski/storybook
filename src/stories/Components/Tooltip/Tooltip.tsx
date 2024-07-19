import * as RadixTooltip from "@radix-ui/react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/pro-duotone-svg-icons";

type Props = {
  tooltipText: string;
};

const Tooltip = (props: Props) => {
  return (
    <RadixTooltip.Provider delayDuration={250}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild className="cursor-help">
          <FontAwesomeIcon icon={faCircleInfo} />
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className="z-50 max-w-tooltip break-words rounded bg-gunmetal-500 p-2 text-sm text-white"
            sideOffset={5}
          >
            {props.tooltipText}
            <RadixTooltip.Arrow className="fill-gunmetal-500" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

export default Tooltip;
