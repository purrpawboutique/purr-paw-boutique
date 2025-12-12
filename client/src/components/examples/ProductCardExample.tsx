import ProductCard from "../ProductCard";
import productImage from "@assets/IMG_3088_1765554785091.jpg";

export default function ProductCardExample() {
  const product = {
    id: "1",
    name: "Holiday Christmas Cape",
    price: 49.99,
    originalPrice: 69.99,
    image: productImage,
    category: "Capes & Cloaks",
    isNew: true,
    isBestseller: true,
  };

  return (
    <div className="max-w-xs">
      <ProductCard
        product={product}
        onAddToCart={(p) => console.log("Added to cart:", p.name)}
        onQuickView={(p) => console.log("Quick view:", p.name)}
      />
    </div>
  );
}
