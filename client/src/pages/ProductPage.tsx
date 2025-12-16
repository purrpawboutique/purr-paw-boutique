import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ProductDetailPage, { DetailedProduct } from "@/components/ProductDetailPage";
import { Product } from "@/components/ProductCard";
import { useCart } from "@/contexts/CartContext";
import { allProducts, getProductBySlug } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

// Import images
import img1 from "@assets/IMG_3081_1765554779089.jpg";
import img2 from "@assets/IMG_3083_1765554781753.jpg";
import img3 from "@assets/IMG_3088_1765554785091.jpg";
import img4 from "@assets/IMG_3138_1765554799301.jpg";
import img5 from "@assets/IMG_3137_1765554802944.jpg";
import img6 from "@assets/IMG_3073_1765554816106.jpg";
import img7 from "@assets/IMG_3075_1765554816107.jpg";

// Convert product data to DetailedProduct format
const convertToDetailedProduct = (product: any): DetailedProduct => ({
  ...product,
  image: product.images[0]?.url || '/images/placeholder-product.jpg',
  images: product.images?.map((img: any) => img.url) || ['/images/placeholder-product.jpg'],
  reviews: [
    {
      id: "r1",
      customerName: "Sarah M.",
      rating: 5,
      comment: `Absolutely love this ${product.name}! The quality is amazing and my pet looks adorable.`,
      date: "December 10, 2024",
      petName: "Luna"
    }
  ],
  relatedProducts: []
});

// Convert all products to DetailedProduct format
const mockDetailedProducts: Record<string, DetailedProduct> = {
  // Add all products from data
  ...Object.fromEntries(
    allProducts.map(product => [
      product.id,
      convertToDetailedProduct(product)
    ])
  ),

};

// Function to get recommended products
const getRecommendedProducts = (currentProductId: string, category: string, price: number): Product[] => {
  // Get products from the same category first
  const sameCategoryProducts = allProducts
    .filter(product => product.id !== currentProductId && product.category === category)
    .map(product => ({
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

  // Get products from other categories with similar price range (±£15)
  const similarPriceProducts = allProducts
    .filter(product => 
      product.id !== currentProductId && 
      product.category !== category &&
      Math.abs(product.price - price) <= 15
    )
    .map(product => ({
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

  // Get bestsellers and new products as fallback
  const popularProducts = allProducts
    .filter(product => 
      product.id !== currentProductId && 
      (product.isBestseller || product.isNew)
    )
    .map(product => ({
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

  // Combine and prioritize: same category first, then similar price, then popular
  const allRecommendations = [
    ...sameCategoryProducts,
    ...similarPriceProducts,
    ...popularProducts
  ];

  // Remove duplicates and take first 4
  const uniqueRecommendations = allRecommendations.filter((product, index, self) => 
    index === self.findIndex(p => p.id === product.id)
  );

  // If we don't have enough recommendations, add random products as fallback
  if (uniqueRecommendations.length < 4) {
    const remainingProducts = allProducts
      .filter(product => 
        product.id !== currentProductId && 
        !uniqueRecommendations.some(rec => rec.id === product.id)
      )
      .map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0]?.url || '/images/placeholder-product.jpg',
        category: product.category,
        isNew: product.isNew,
        isBestseller: product.isBestseller,
        isOutOfStock: product.sizes?.every(size => !size.inStock) || false,
      }))
      .slice(0, 4 - uniqueRecommendations.length);

    uniqueRecommendations.push(...remainingProducts);
  }

  return uniqueRecommendations.slice(0, 4);
};

export default function ProductPage() {
  const [match, params] = useRoute("/product/:id");
  const [, setLocation] = useLocation();
  const [product, setProduct] = useState<DetailedProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const { 
    cartItems, 
    cartOpen, 
    setCartOpen, 
    addToCart, 
    updateQuantity, 
    removeItem, 
    getTotalItems 
  } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (match && params?.id) {
      // Scroll to top when product page loads
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Simulate API call
      setLoading(true);
      setTimeout(() => {
        const foundProduct = mockDetailedProducts[params.id];
        if (foundProduct) {
          // Add recommended products
          foundProduct.relatedProducts = getRecommendedProducts(
            foundProduct.id, 
            foundProduct.category, 
            foundProduct.price
          );
          setProduct(foundProduct);
        } else {
          setProduct(null);
        }
        setLoading(false);
      }, 500);
    }
  }, [match, params?.id]);

  const handleAddToCart = (product: Product, quantity = 1, size = "M") => {
    addToCart(product, quantity, size);
  };

  const handleRelatedProductClick = (relatedProduct: Product) => {
    setLocation(`/product/${relatedProduct.id}`);
  };

  if (!match) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header
          cartCount={getTotalItems()}
          onCartClick={() => setCartOpen(true)}
        />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading product details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header
          cartCount={getTotalItems()}
          onCartClick={() => setCartOpen(true)}
        />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="font-serif text-4xl font-medium mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">
              Sorry, we couldn't find the product you're looking for.
            </p>
            <button
              onClick={() => setLocation("/shop")}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartCount={getTotalItems()}
        onCartClick={() => setCartOpen(true)}
      />

      <ProductDetailPage
        product={product}
        onAddToCart={handleAddToCart}
        onRelatedProductClick={handleRelatedProductClick}
      />

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