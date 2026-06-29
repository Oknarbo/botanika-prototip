import type { ProductCategory } from "./products";

const q = "w=600&h=600&fit=crop&q=80";

/** Provjereni Unsplash URL-ovi — svi vraćaju 200 (neki stari ID-evi su uklonjeni s Unsplasha). */
export const PRODUCT_IMAGES: Record<ProductCategory, string[]> = {
  growbox: [
    `https://images.unsplash.com/photo-1416879595882-3373a0480b5b?${q}`,
    `https://images.unsplash.com/photo-1463936575829-25148e1db1b8?${q}`,
    `https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?${q}`,
  ],
  rasvjeta: [
    `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?${q}`,
    `https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?${q}`,
    `https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?${q}`,
  ],
  ventilacija: [
    `https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?${q}`,
    `https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?${q}`,
  ],
  supstrat: [
    `https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?${q}`,
    `https://images.unsplash.com/photo-1416879595882-3373a0480b5b?${q}`,
    `https://images.unsplash.com/photo-1463936575829-25148e1db1b8?${q}`,
  ],
  gnojiva: [
    `https://images.unsplash.com/photo-1606787366850-de6330128bfc?${q}`,
    `https://images.unsplash.com/photo-1481391319762-47dff72954d9?${q}`,
    `https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?${q}`,
  ],
  mjerenje: [
    `https://images.unsplash.com/photo-1481391319762-47dff72954d9?${q}`,
    `https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?${q}`,
  ],
  dodaci: [
    `https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?${q}`,
    `https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?${q}`,
    `https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?${q}`,
  ],
};

export const PRODUCT_IMAGE_FALLBACK = "/images/product-fallback.svg";

export function getProductImage(category: ProductCategory, index = 0): string {
  const pool = PRODUCT_IMAGES[category];
  return pool[index % pool.length];
}
