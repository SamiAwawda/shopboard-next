"use client";

import * as React from "react";
import { Dialog as ModalPrimitive } from "@base-ui/react/dialog";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { overlayBackdrop, overlayCloseButton } from "@/components/ui/shared";

// Built on Base UI's Dialog: it handles Esc, the focus trap, and returning focus to the trigger.

function Modal(props: ModalPrimitive.Root.Props) {
  return <ModalPrimitive.Root data-slot="modal" {...props} />;
}

function ModalTrigger(props: ModalPrimitive.Trigger.Props) {
  return <ModalPrimitive.Trigger data-slot="modal-trigger" {...props} />;
}

function ModalClose(props: ModalPrimitive.Close.Props) {
  return <ModalPrimitive.Close data-slot="modal-close" {...props} />;
}

function ModalContent({ className, children, ...props }: ModalPrimitive.Popup.Props) {
  return (
    <ModalPrimitive.Portal>
      <ModalPrimitive.Backdrop className={overlayBackdrop} />
      <ModalPrimitive.Popup
        data-slot="modal-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 flex w-full max-w-md -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-2xl bg-popover p-6 text-sm text-popover-foreground shadow-lg ring-1 ring-foreground/10 outline-none transition duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0",
          className,
        )}
        {...props}
      >
        {children}
        <ModalPrimitive.Close
          render={<Button variant="ghost" size="icon-sm" className={overlayCloseButton} />}
        >
          <XIcon />
          <span className="sr-only">Close</span>
        </ModalPrimitive.Close>
      </ModalPrimitive.Popup>
    </ModalPrimitive.Portal>
  );
}

function ModalTitle({ className, ...props }: ModalPrimitive.Title.Props) {
  return (
    <ModalPrimitive.Title
      data-slot="modal-title"
      className={cn("text-base font-medium", className)}
      {...props}
    />
  );
}

function ModalDescription({ className, ...props }: ModalPrimitive.Description.Props) {
  return (
    <ModalPrimitive.Description
      data-slot="modal-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function ModalFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="modal-footer" className={cn("flex justify-end gap-2", className)} {...props} />
  );
}

export { Modal, ModalTrigger, ModalClose, ModalContent, ModalTitle, ModalDescription, ModalFooter };
