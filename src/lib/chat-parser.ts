export interface ProductRecommendation {
  id: string;
  reason: string;
}

const PRODUCTS_BLOCK_REGEX = /```botanika-products\s*([\s\S]*?)```/;

export function parseProductRecommendations(content: string): {
  text: string;
  products: ProductRecommendation[];
} {
  const match = content.match(PRODUCTS_BLOCK_REGEX);
  if (!match) {
    return { text: content.trim(), products: [] };
  }

  const text = content.replace(PRODUCTS_BLOCK_REGEX, "").trim();
  let products: ProductRecommendation[] = [];

  try {
    const parsed = JSON.parse(match[1].trim());
    if (Array.isArray(parsed)) {
      products = parsed
        .filter(
          (item): item is ProductRecommendation =>
            typeof item?.id === "string" && typeof item?.reason === "string"
        )
        .slice(0, 4);
    }
  } catch {
    products = [];
  }

  return { text, products };
}
