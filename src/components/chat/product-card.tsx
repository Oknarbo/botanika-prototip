"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import type { ProductRecommendation } from "@/lib/chat-parser";
import { getProductById } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  recommendation: ProductRecommendation;
}

export function ChatProductCard({ recommendation }: ProductCardProps) {
  const product = getProductById(recommendation.id);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  if (!product) return null;

  const handleAdd = () => {
    addItem(product);
    openCart();
    toast.success(`${product.name} dodan u košaricu`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3 rounded-xl border border-botanika-green/20 bg-botanika-dark/80 p-3"
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <p className="truncate text-sm font-medium text-botanika-cream">
            {product.name}
          </p>
          <p className="text-xs text-botanika-cream/50 line-clamp-2">
            {recommendation.reason}
          </p>
        </div>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-botanika-green">
            {formatPrice(product.price)}
          </span>
          <Button size="sm" onClick={handleAdd} disabled={!product.inStock}>
            <ShoppingCart className="h-3.5 w-3.5" />
            Dodaj
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
