import { forwardRef } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { popOverContentStyle } from "../../../css/popOverDefaultCss";

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverClose = PopoverPrimitive.Close;

type PopoverContentProps = Omit<React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>, "className" | "style"> & { matchTriggerWidth?: boolean };

const PopoverContent = forwardRef<React.ElementRef<typeof PopoverPrimitive.Content>, PopoverContentProps>(({ matchTriggerWidth, ...props }, ref) => {
  const popoverProps = { ...props };
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        sideOffset={5}
        className={`${popOverContentStyle.join(" ")} ${matchTriggerWidth ? 'w-[--radix-popover-trigger-width]' : ''}`}
        {...popoverProps}
      >
        {props.children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
});

PopoverContent.displayName = PopoverPrimitive.Content.displayName;
export { Popover, PopoverTrigger, PopoverContent, PopoverClose };
