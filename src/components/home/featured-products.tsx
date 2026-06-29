"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_LABELS } from "@/lib/products";

const featured = products.slice(0, 8);

export function FeaturedProducts() {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-botanika-cream sm:text-4xl">
            Istaknuti proizvodi
          </h2>
          <p className="mt-3 text-botanika-cream/50">
            Premium oprema za ozbiljan indoor uzgoj
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-botanika-cream/10 bg-botanika-dark/60 transition-all duration-300 hover:border-botanika-green/30 hover:shadow-xl hover:shadow-botanika-green/5"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
                <Badge className="absolute left-3 top-3" variant="secondary">
                  {CATEGORY_LABELS[product.category]}
                </Badge>
              </div>
              <div className="p-4">
                <p className="text-xs text-botanika-cream/40">{product.brand}</p>
                <h3 className="mt-1 line-clamp-2 font-medium text-botanika-cream">
                  {product.name}
                </h3>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-bold text-botanika-green">
                    {formatPrice(product.price)}
                  </span>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      addItem(product);
                      toast.success("Dodano u košaricu");
                    }}
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
