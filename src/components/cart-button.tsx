"use client";

import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal";
import { formatPrice } from "@/lib/money";
import { changeQty, clearCart, removeFromCart, useCart } from "@/lib/cart";

export function CartButton() {
  const { items, count, totalCents } = useCart();

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="secondary" size="icon" className="relative" aria-label="Open cart" />
        }
      >
        <ShoppingCart />
        {count > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-medium text-primary-foreground">
            {count}
          </span>
        )}
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Your cart ({count})</SheetTitle>
        </SheetHeader>

        <div className="flex-1 space-y-4 overflow-y-auto px-4">
          {items.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">Your cart is empty.</p>
          ) : (
            items.map((i) => (
              <div key={i.id} className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate font-medium">{i.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatPrice(i.priceCents * i.qty)}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    size="icon-sm"
                    variant="secondary"
                    onClick={() => changeQty(i.id, -1)}
                    aria-label="Decrease"
                  >
                    <Minus />
                  </Button>
                  <span className="w-6 text-center text-sm">{i.qty}</span>
                  <Button
                    size="icon-sm"
                    variant="secondary"
                    onClick={() => changeQty(i.id, 1)}
                    aria-label="Increase"
                  >
                    <Plus />
                  </Button>
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    onClick={() => removeFromCart(i.id)}
                    aria-label="Remove"
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{formatPrice(totalCents)}</span>
            </div>
            <Modal>
              <ModalTrigger render={<Button variant="secondary" />}>Clear cart</ModalTrigger>
              <ModalContent>
                <ModalTitle>Clear your cart?</ModalTitle>
                <ModalDescription>
                  {count === 1 ? "The item" : `All ${count} items`} will be removed. This can&apos;t
                  be undone.
                </ModalDescription>
                <ModalFooter>
                  <ModalClose render={<Button variant="secondary" />}>Cancel</ModalClose>
                  <ModalClose render={<Button onClick={clearCart} />}>Clear cart</ModalClose>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
