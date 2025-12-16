import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ProductGrid from "@/components/ProductGrid";
import ProductQuickView from "@/components/ProductQuickView";
import { getProductsByCategory } from "@/data/products";
import { Product } from "@/components/ProductCard";

export default function CategoryPage() {
  const [, params] = useRoute("/category/:categoryName");
  const [, setLocation] = useLocation();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const { 
    cartItems, 
    cartOpen, 
    setCartOpen, 
    addToCart, 
    updateQuantity, 
    removeItem, 
    getTotalItems 
  } = useCart();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const categoryName = params?.categoryName || "";
  const decodedCategoryName = decodeURIComponent(categoryName);
  
  // Get products for this category
  const categoryProducts = getProductsByCategory(decodedCategoryName);
  
  // Convert to Product format for compatibility
  const products: Product[] = categoryProducts.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.images[0]?.url || '/images/placeholder-product.jpg',
    category: product.category,
    isNew: product.isNew,
    isBestseller: product.isBestseller,
    isOutOfStock: product.sizes?.every(size => !size.inStock) || false,
  }));

  // If no products found, redirect to collections page
  if (categoryProducts.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartCount={getTotalItems()} onCartClick={() => setCartOpen(true)} />
        
        <main className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="font-serif text-4xl font-medium mb-4">Category Not Found</h1>
            <p className="text-muted-foreground mb-8">
              Sorry, we couldn't find any products in the "{decodedCategoryName}" category.
            </p>
            <button
              onClick={() => setLocation("/collections")}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Browse All Collections
            </button>
          </div>
        </main>

        <Footer />
        
        <CartDrawer
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onCheckout={() => setLocation("/auth-gateway")}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={getTotalItems()} onCartClick={() => setCartOpen(true)} />

      <main className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl font-medium mb-2">{decodedCategoryName}</h1>
            <p className="text-muted-foreground">
              {products.length} product{products.length !== 1 ? 's' : ''} in this collection
            </p>
          </div>
        </div>

        <ProductGrid
          products={products}
          onAddToCart={addToCart}
          onQuickView={setQuickViewProduct}
        />
      </main>

      <Footer />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={() => setLocation("/auth-gateway")}
      />

      <ProductQuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={addToCart}
      />
    </div>
  );
}