import ProductCard, { Product } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  onAddToCart: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export default function ProductGrid({
  products,
  title,
  subtitle,
  onAddToCart,
  onQuickView,
}: ProductGridProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {subtitle && (
              <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="font-serif text-3xl md:text-4xl font-medium">
                {title}
              </h2>
            )}
          </div>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
