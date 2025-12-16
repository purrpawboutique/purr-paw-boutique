import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import CartDrawer from "@/components/CartDrawer";
import ProductQuickView from "@/components/ProductQuickView";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/components/ProductCard";
import { allProducts, getMainProductImage } from "@/data/products";


export default function SalePage() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [, setLocation] = useLocation();
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

  // Filter products that have originalPrice (indicating they're on sale)
  const saleProducts: Product[] = allProducts
    .filter(product => product.originalPrice && product.originalPrice > product.price)
    .map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: getMainProductImage(product),
      category: product.category,
      isNew: product.isNew,
      isBestseller: product.isBestseller,
      isOutOfStock: product.sizes?.every(size => !size.inStock) || false,
    }));

  const calculateDiscount = (price: number, originalPrice: number) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartCount={getTotalItems()}
        onCartClick={() => setCartOpen(true)}
      />

      <main className="pt-8">
        {/* Sale Header */}
        <div className="py-8 mb-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-2">
              <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
                Limited Time
              </p>
              <h1 className="font-serif text-3xl md:text-4xl font-medium mb-4 text-foreground">
                Special Offers
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Discover selected premium pet fashion items at special prices
              </p>
            </div>
          </div>
        </div>

        {/* Sale Products */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8">
          {saleProducts.length > 0 ? (
            <>
              <div className="mb-4">
                <h2 className="font-serif text-2xl font-medium mb-2">
                  Sale Items ({saleProducts.length})
                </h2>
                <p className="text-muted-foreground">
                  Save up to {Math.max(...saleProducts.map(p => calculateDiscount(p.price, p.originalPrice || p.price)))}% on selected items
                </p>
              </div>
              
              <ProductGrid
                products={saleProducts}
                onAddToCart={addToCart}
                onQuickView={setQuickViewProduct}
              />
            </>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">🛍️</div>
                <h3 className="font-serif text-2xl font-medium mb-4">No Sale Items Currently</h3>
                <p className="text-muted-foreground mb-6">
                  Check back soon for amazing deals on premium pet fashion!
                </p>
                <button
                  onClick={() => setLocation("/shop")}
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Browse All Products
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sale Banner */}
        <div className="bg-gray-50 border border-gray-200 py-8 mb-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h3 className="font-serif text-2xl font-medium mb-2 text-gray-900">
              Subscribe for Exclusive Sale Alerts
            </h3>
            <p className="mb-4 text-gray-600">
              Be the first to know about new sales and special promotions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
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

      <ProductQuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={addToCart}
      />
    </div>
  );
}