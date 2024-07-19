import { forwardRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/pro-duotone-svg-icons";

type DialogContentProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
};

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;
const DialogOverlay = DialogPrimitive.Overlay;
const DialogTitle = DialogPrimitive.Title;
const DialogDescription = DialogPrimitive.Description;

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  (props, ref) => (
    <DialogPortal>
      <DialogOverlay className="fixed inset-0 z-40 bg-black/50" />
      <DialogPrimitive.Content
        ref={ref}
        className="fixed left-1/2 top-1/2 z-40 h-auto w-auto -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded bg-white"
      >
        <div className="max-h-[90vh] max-w-5xl overflow-y-auto p-5 2xl:max-h-[75vh]">
          <div className="flex justify-between">
            <DialogTitle>{props.title}</DialogTitle>
            <DialogClose aria-label="Close">
              <FontAwesomeIcon icon={faX} />
            </DialogClose>
          </div>
          <DialogDescription className="my-2">
            {props.description}
          </DialogDescription>
          {props.children}
        </div>
      </DialogPrimitive.Content>
    </DialogPortal>
  ),
);

export { Dialog, DialogPortal, DialogClose, DialogTrigger };
