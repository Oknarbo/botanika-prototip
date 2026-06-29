"use client";

import Image from "next/image";
import { useState } from "react";
import { PRODUCT_IMAGE_FALLBACK } from "@/lib/product-images";
import { cn } from "@/lib/utils";

interface ProductImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
}

export function ProductImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  sizes,
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      sizes={sizes}
      className={cn("object-cover", className)}
      onError={() => setImgSrc(PRODUCT_IMAGE_FALLBACK)}
    />
  );
}
