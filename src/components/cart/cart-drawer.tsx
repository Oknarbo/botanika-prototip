"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalPrice,
    clearCart,
  } = useCartStore();

  const handleCheckout = () => {
    toast.success("Prototip — narudžba simulirana! 🌱");
    clearCart();
    closeCart();
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-botanika-green" />
            Košarica ({items.length})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingBag className="h-16 w-16 text-botanika-cream/20" />
            <p className="text-botanika-cream/50">Košarica je prazna</p>
            <Button variant="secondary" onClick={closeCart} asChild>
              <Link href="/shop">Pogledaj shop</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto py-4">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-3 rounded-xl border border-botanika-cream/10 p-3"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="truncate text-sm font-medium text-botanika-cream">
                      {product.name}
                    </p>
                    <p className="text-sm font-semibold text-botanika-green">
                      {formatPrice(product.price)}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(product.id, quantity - 1)
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-botanika-cream/20 text-botanika-cream/70 hover:bg-botanika-cream/10"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm text-botanika-cream">
                          {quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(product.id, quantity + 1)
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-botanika-cream/20 text-botanika-cream/70 hover:bg-botanika-cream/10"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-botanika-cream/40 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-botanika-cream/10 pt-4">
              <div className="mb-4 flex justify-between text-lg font-semibold">
                <span className="text-botanika-cream/70">Ukupno</span>
                <span className="text-botanika-green">
                  {formatPrice(totalPrice())}
                </span>
              </div>
              <Button className="w-full" size="lg" onClick={handleCheckout}>
                Naruči (prototip)
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
