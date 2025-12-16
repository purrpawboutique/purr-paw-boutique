import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

interface CategorySectionProps {
  categories: Category[];
  onCategoryClick: (category: Category) => void;
}

export default function CategorySection({ categories, onCategoryClick }: CategorySectionProps) {
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
            Browse by Category
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium">
            Shop Collections
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="group cursor-pointer overflow-hidden border-0 hover-elevate active-elevate-2"
              onClick={() => onCategoryClick(category)}
              data-testid={`card-category-${category.id}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-serif text-2xl font-medium mb-1">
                    {category.name}
                  </h3>
                  <p className="text-white/80 text-sm mb-3">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span>{category.productCount} Products</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
