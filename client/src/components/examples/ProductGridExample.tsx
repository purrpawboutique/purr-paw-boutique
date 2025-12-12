import ProductGrid from "../ProductGrid";
import img1 from "@assets/IMG_3081_1765554779089.jpg";
import img2 from "@assets/IMG_3088_1765554785091.jpg";
import img3 from "@assets/IMG_3138_1765554799301.jpg";
import img4 from "@assets/IMG_3073_1765554816106.jpg";

const products = [
  {
    id: "1",
    name: "Holiday Christmas Cape",
    price: 59.99,
    image: img1,
    category: "Holiday Collection",
    isNew: true,
  },
  {
    id: "2",
    name: "Festive Collar Set",
    price: 45.99,
    originalPrice: 59.99,
    image: img2,
    category: "Accessories",
    isBestseller: true,
  },
  {
    id: "3",
    name: "Circus Princess Dress",
    price: 79.99,
    image: img3,
    category: "Dresses",
  },
  {
    id: "4",
    name: "Royal Blue Gown",
    price: 89.99,
    image: img4,
    category: "Formal Wear",
    isNew: true,
  },
];

export default function ProductGridExample() {
  return (
    <ProductGrid
      products={products}
      title="Featured Collection"
      subtitle="Handpicked for your fur baby"
      onAddToCart={(p) => console.log("Added:", p.name)}
      onQuickView={(p) => console.log("View:", p.name)}
    />
  );
}
