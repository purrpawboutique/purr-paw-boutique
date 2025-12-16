import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ProductGrid from "@/components/ProductGrid";
import CategorySection from "@/components/CategorySection";
import AboutSection from "@/components/AboutSection";
import TestimonialSection from "@/components/TestimonialSection";
import NewsletterBanner from "@/components/NewsletterBanner";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ProductQuickView from "@/components/ProductQuickView";
import ProductPage from "@/pages/ProductPage";
import CheckoutPage from "@/pages/CheckoutPage";
import AuthGatewayPage from "@/pages/AuthGatewayPage";
import OrderConfirmationPage from "@/pages/OrderConfirmationPage";
import ShippingPage from "@/pages/ShippingPage";
import ReturnsPage from "@/pages/ReturnsPage";
import CategoryPage from "@/pages/CategoryPage";
import ThankYouPage from "@/pages/ThankYouPage";
import SalePage from "@/pages/SalePage";
import { CartProvider, useCart } from "@/contexts/CartContext";
import ScrollToTop from "@/components/ScrollToTop";
import { Product } from "@/components/ProductCard";
import { holidayProducts, signatureProducts, ootdProducts, accessoriesProducts, handmadeKnitsProducts, allProducts, getMainProductImage } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

import img1 from "@assets/IMG_3081_1765554779089.jpg";
import img2 from "@assets/IMG_3083_1765554781753.jpg";
import img3 from "@assets/IMG_3088_1765554785091.jpg";
import img4 from "@assets/IMG_3138_1765554799301.jpg";
import img5 from "@assets/IMG_3137_1765554802944.jpg";
import img6 from "@assets/IMG_3073_1765554816106.jpg";
import img7 from "@assets/IMG_3075_1765554816107.jpg";

// Convert all products to Product format for compatibility
const mockProducts: Product[] = [
  ...allProducts.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    image: getMainProductImage(product),
    category: product.category,
    isNew: product.isNew,
    isBestseller: product.isBestseller,
    isOutOfStock: product.sizes?.every(size => !size.inStock) || false,
  })),
];

// todo: remove mock functionality
const mockCategories = [
  {
    id: "1",
    name: "Haute Couture · Fully Custom Made",
    description: "This is fashion for legacy.",
    image: "/images/products/haute-lady-shakespeare/main.jpg",
    productCount: 1,
  },
  {
    id: "2",
    name: "Holiday Collection",
    description: "Festive outfits for special occasions",
    image: img2,
    productCount: 4,
  },
  {
    id: "3",
    name: "Signature Styles",
    description: "Exclusive designer pieces",
    image: img6,
    productCount: 4,
  },
  {
    id: "4",
    name: "OOTD",
    description: "Outfit of the day essentials",
    image: "/images/products/ootd-sherlock-heritage-coat/main.jpg",
    productCount: 6,
  },
  {
    id: "5",
    name: "Accessories",
    description: "Premium pet accessories and essentials",
    image: "/images/products/accessories-softwalk-leather-leash/main.jpg",
    productCount: 2,
  },
  {
    id: "6",
    name: "Costumes",
    description: "Fun and creative pet costumes",
    image: img5,
    productCount: 1,
  },
  {
    id: "7",
    name: "Handmade Cozy Knits",
    description: "Luxurious handcrafted wool pieces",
    image: "/images/products/knits-poncho-merino-wool-hoodie/main.jpg",
    productCount: 2,
  },
];

// todo: remove mock functionality
const mockTestimonials = [
  {
    id: "1",
    name: "Sarah M.",
    petName: "Luna",
    rating: 5,
    text: "Absolutely stunning quality! Luna looks like a little princess in her holiday cape. The attention to detail is incredible.",
    petImage: img2,
  },
  {
    id: "2",
    name: "James L.",
    petName: "Whiskers",
    rating: 5,
    text: "My cat actually loves wearing these outfits! So comfortable and well-made. Will definitely be ordering more.",
    petImage: img5,
  },
  {
    id: "3",
    name: "Emily R.",
    petName: "Duchess",
    rating: 5,
    text: "The blue gown is even more beautiful in person. Everyone stops us on walks to compliment Duchess!",
    petImage: img7,
  },
];

function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [, setLocation] = useLocation();
  const { 
    cartItems, 
    cartOpen, 
    setCartOpen, 
    addToCart, 
    updateQuantity, 
    removeItem, 
    getTotalItems,
    clearCart
  } = useCart();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartCount={getTotalItems()}
        onCartClick={() => setCartOpen(true)}
      />

      <main>
        <HeroSection 
          onShopNow={() => setLocation("/shop")} 
          onOurStory={() => setLocation("/about")}
        />
        
        <FeaturesSection />

        <ProductGrid
          products={mockProducts.filter(product => 
            // New Arrivals - Holiday and Signature collections
            product.id === "holiday-christmas-luxurious-gown" ||
            product.id === "holiday-christmas-midnight-princess-gothic-lolita-dress" ||
            product.id === "signature-sakura-fairy-princess-dress" ||
            product.id === "signature-golden-soirée-set"
          ).slice(0, 4)}
          title="New Arrivals"
          subtitle="Fresh styles for your fur baby"
          onAddToCart={addToCart}
          onQuickView={setQuickViewProduct}
        />

        <CategorySection
          categories={mockCategories}
          onCategoryClick={(cat) => setLocation(`/category/${encodeURIComponent(cat.name)}`)}
        />

        <ProductGrid
          products={mockProducts.slice(4)}
          title="Bestsellers"
          subtitle="Customer favorites"
          onAddToCart={addToCart}
          onQuickView={setQuickViewProduct}
        />

        <AboutSection onLearnMore={() => setLocation("/about")} />

        <TestimonialSection testimonials={mockTestimonials} />

        <NewsletterBanner />
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

function ShopPage() {
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

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartCount={getTotalItems()}
        onCartClick={() => setCartOpen(true)}
      />

      <main className="pt-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8">
          <h1 className="font-serif text-4xl font-medium mb-2">Shop All Products</h1>
          <p className="text-muted-foreground">Browse our complete range of premium pet fashion</p>
        </div>

        <ProductGrid
          products={mockProducts}
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

function CollectionsPage() {
  const { toast } = useToast();
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

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartCount={getTotalItems()}
        onCartClick={() => setCartOpen(true)}
      />

      <main className="pt-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-6">
          <h1 className="font-serif text-4xl font-medium mb-2">Our Collections</h1>
          <p className="text-muted-foreground">Explore our curated collections designed for every occasion</p>
        </div>

        <CategorySection
          categories={mockCategories}
          onCategoryClick={(cat) => setLocation(`/category/${encodeURIComponent(cat.name)}`)}
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
    </div>
  );
}

function AboutPage() {
  const { cartOpen, setCartOpen, getTotalItems } = useCart();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={getTotalItems()} onCartClick={() => setCartOpen(true)} />

      <main>
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
              Our Story
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-medium mb-8">
              About Purr & Paw Boutique
            </h1>
            <div className="aspect-video rounded-lg overflow-hidden mb-12">
              <img src={img6} alt="Our story" className="w-full h-full object-cover" />
            </div>
            <div className="text-left space-y-6 text-muted-foreground leading-relaxed">
              <p>
                At Purr & Paw Boutique, we believe every pet deserves to feel special. Our journey began with a simple idea: to create beautiful, comfortable clothing that celebrates the unique bond between pets and their families.
              </p>
              <p>
                Each piece in our collection is thoughtfully designed using premium, pet-safe materials. We pay attention to every detail, from the softness of fabrics to the ease of wear, ensuring your furry friends look adorable while feeling comfortable.
              </p>
              <p>
                Our designs range from elegant everyday wear to show-stopping special occasion pieces, because we know your pet is family, and family deserves the best. We work with skilled artisans who share our passion for quality and attention to detail.
              </p>
              <p>
                Thank you for being part of the Purr & Paw family. Together, we're making the world a more stylish place, one pet at a time.
              </p>
            </div>
          </div>
        </section>

        <NewsletterBanner />
      </main>

      <Footer />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={[]}
        onUpdateQuantity={() => {}}
        onRemoveItem={() => {}}
        onCheckout={() => {}}
      />
    </div>
  );
}

function ContactPage() {
  const { cartOpen, setCartOpen, getTotalItems } = useCart();
  const { toast } = useToast();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={getTotalItems()} onCartClick={() => setCartOpen(true)} />

      <main className="py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
              Get in Touch
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-medium mb-4">
              Contact Us
            </h1>
            <p className="text-muted-foreground">
              Have a question or custom order request? We'd love to hear from you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                  data-testid="input-contact-name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your@email.com"
                  data-testid="input-contact-email"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="How can we help?"
                data-testid="input-contact-subject"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                rows={6}
                className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Tell us more..."
                data-testid="input-contact-message"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              data-testid="button-contact-submit"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>

      <Footer />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={[]}
        onUpdateQuantity={() => {}}
        onRemoveItem={() => {}}
        onCheckout={() => {}}
      />
    </div>
  );
}

function NotFoundPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="font-serif text-6xl font-medium mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! This page seems to have wandered off.
        </p>
        <button
          onClick={() => setLocation("/")}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          data-testid="button-go-home"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}

function CheckoutPageWrapper() {
  const { cartItems, clearCart } = useCart();

  const handleOrderComplete = (orderId: string) => {
    // Clear cart after successful order
    clearCart();
  };

  return (
    <CheckoutPage 
      cartItems={cartItems} 
      onOrderComplete={handleOrderComplete}
    />
  );
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/collections" component={CollectionsPage} />
        <Route path="/sale" component={SalePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/shipping" component={ShippingPage} />
        <Route path="/returns" component={ReturnsPage} />
        <Route path="/category/:categoryName" component={CategoryPage} />
        <Route path="/product/:id" component={ProductPage} />
        <Route path="/auth-gateway" component={AuthGatewayPage} />
        <Route path="/checkout" component={CheckoutPageWrapper} />
        <Route path="/thank-you" component={ThankYouPage} />
        <Route path="/order-confirmation/:orderId?" component={OrderConfirmationPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Router />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
