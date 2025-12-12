import CategorySection from "../CategorySection";
import img1 from "@assets/IMG_3083_1765554781753.jpg";
import img2 from "@assets/IMG_3137_1765554802944.jpg";
import img3 from "@assets/IMG_3075_1765554816107.jpg";

const categories = [
  {
    id: "1",
    name: "Holiday Collection",
    description: "Festive outfits for special occasions",
    image: img1,
    productCount: 24,
  },
  {
    id: "2",
    name: "Costumes & Cosplay",
    description: "Fun and creative pet costumes",
    image: img2,
    productCount: 18,
  },
  {
    id: "3",
    name: "Elegant Dresses",
    description: "Sophisticated styles for your pet",
    image: img3,
    productCount: 32,
  },
];

export default function CategorySectionExample() {
  return (
    <CategorySection
      categories={categories}
      onCategoryClick={(cat) => console.log("Category:", cat.name)}
    />
  );
}
