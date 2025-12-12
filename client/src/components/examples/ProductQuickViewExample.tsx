import { useState } from "react";
import ProductQuickView from "../ProductQuickView";
import { Button } from "@/components/ui/button";
import productImage from "@assets/IMG_3138_1765554799301.jpg";

export default function ProductQuickViewExample() {
  const [isOpen, setIsOpen] = useState(true);

  const product = {
    id: "1",
    name: "Circus Princess Dress",
    price: 79.99,
    originalPrice: 99.99,
    image: productImage,
    category: "Dresses",
    isNew: true,
    isBestseller: true,
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Quick View</Button>
      <ProductQuickView
        product={product}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAddToCart={(p, qty, size) => console.log(`Added ${qty}x ${p.name} (${size})`)}
      />
    </>
  );
}
