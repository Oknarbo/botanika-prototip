"use client";

import { ProductImage } from "@/components/ui/product-image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";
import {
  products,
  brands,
  CATEGORY_LABELS,
  PHASE_LABELS,
  type ProductCategory,
  type GrowthPhase,
} from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPhases, setSelectedPhases] = useState<GrowthPhase[]>([]);
  const [maxPrice, setMaxPrice] = useState(400);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategories.length && !selectedCategories.includes(p.category))
        return false;
      if (selectedBrands.length && !selectedBrands.includes(p.brand))
        return false;
      if (selectedPhases.length && !selectedPhases.includes(p.phase))
        return false;
      if (p.price > maxPrice) return false;
      return true;
    });
  }, [selectedCategories, selectedBrands, selectedPhases, maxPrice]);

  const toggleCategory = (cat: ProductCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const togglePhase = (phase: GrowthPhase) => {
    setSelectedPhases((prev) =>
      prev.includes(phase) ? prev.filter((p) => p !== phase) : [...prev, phase]
    );
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-botanika-cream">
          Kategorija
        </h3>
        <div className="space-y-2">
          {(Object.keys(CATEGORY_LABELS) as ProductCategory[]).map((cat) => (
            <label
              key={cat}
              className="flex cursor-pointer items-center gap-2 text-sm text-botanika-cream/70"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="rounded border-botanika-cream/30 bg-botanika-dark text-botanika-green focus:ring-botanika-green"
              />
              {CATEGORY_LABELS[cat]}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-botanika-cream">Brend</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex cursor-pointer items-center gap-2 text-sm text-botanika-cream/70"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="rounded border-botanika-cream/30 bg-botanika-dark text-botanika-green focus:ring-botanika-green"
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-botanika-cream">
          Faza rasta
        </h3>
        <div className="space-y-2">
          {(Object.keys(PHASE_LABELS) as GrowthPhase[]).map((phase) => (
            <label
              key={phase}
              className="flex cursor-pointer items-center gap-2 text-sm text-botanika-cream/70"
            >
              <input
                type="checkbox"
                checked={selectedPhases.includes(phase)}
                onChange={() => togglePhase(phase)}
                className="rounded border-botanika-cream/30 bg-botanika-dark text-botanika-green focus:ring-botanika-green"
              />
              {PHASE_LABELS[phase]}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-botanika-cream">
          Max cijena: {formatPrice(maxPrice)}
        </h3>
        <input
          type="range"
          min={20}
          max={400}
          step={10}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-botanika-green"
        />
      </div>

      <Button
        variant="secondary"
        size="sm"
        className="w-full"
        onClick={() => {
          setSelectedCategories([]);
          setSelectedBrands([]);
          setSelectedPhases([]);
          setMaxPrice(400);
        }}
      >
        Resetiraj filtere
      </Button>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-botanika-cream">Shop</h1>
        <p className="mt-2 text-botanika-cream/50">
          {filteredProducts.length} proizvoda · Premium indoor oprema
        </p>
      </div>

      <div className="flex gap-8">
        {/* Desktop filters */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24 rounded-2xl border border-botanika-cream/10 bg-botanika-dark/60 p-6">
            <h2 className="mb-4 flex items-center gap-2 font-semibold text-botanika-cream">
              <SlidersHorizontal className="h-4 w-4" />
              Filteri
            </h2>
            <FilterPanel />
          </div>
        </aside>

        <div className="flex-1">
          <Button
            variant="secondary"
            size="sm"
            className="mb-4 lg:hidden"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filteri
          </Button>

          {mobileFiltersOpen && (
            <div className="mb-6 rounded-2xl border border-botanika-cream/10 bg-botanika-dark/60 p-6 lg:hidden">
              <FilterPanel />
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="group overflow-hidden rounded-2xl border border-botanika-cream/10 bg-botanika-dark/60 transition-all hover:border-botanika-green/30 hover:shadow-lg hover:shadow-botanika-green/5"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <span className="text-sm font-medium text-botanika-cream">
                        Nema na zalihi
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      {CATEGORY_LABELS[product.category]}
                    </Badge>
                    <Badge variant="outline">{product.brand}</Badge>
                  </div>
                  <h3 className="mt-2 font-medium text-botanika-cream line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-xs text-botanika-cream/40 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-botanika-green">
                      {formatPrice(product.price)}
                    </span>
                    <Button
                      size="sm"
                      disabled={!product.inStock}
                      onClick={() => {
                        addItem(product);
                        toast.success("Dodano u košaricu");
                      }}
                      className={cn(
                        "opacity-0 transition-opacity group-hover:opacity-100",
                        "sm:opacity-100"
                      )}
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      Dodaj
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-20 text-center text-botanika-cream/50">
              Nema proizvoda za odabrane filtere.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
