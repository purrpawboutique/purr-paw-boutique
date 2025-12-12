import { useState } from "react";
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
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import ProductQuickView from "@/components/ProductQuickView";
import { Product } from "@/components/ProductCard";
import { useToast } from "@/hooks/use-toast";

import img1 from "@assets/IMG_3081_1765554779089.jpg";
import img2 from "@assets/IMG_3083_1765554781753.jpg";
import img3 from "@assets/IMG_3088_1765554785091.jpg";
import img4 from "@assets/IMG_3138_1765554799301.jpg";
import img5 from "@assets/IMG_3137_1765554802944.jpg";
import img6 from "@assets/IMG_3073_1765554816106.jpg";
import img7 from "@assets/IMG_3075_1765554816107.jpg";

// todo: remove mock functionality - replace with API data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Holiday Christmas Cape",
    price: 59.99,
    image: img1,
    category: "Holiday Collection",
    isNew: true,
    isBestseller: true,
  },
  {
    id: "2",
    name: "Festive Red Dress",
    price: 49.99,
    image: img2,
    category: "Holiday Collection",
  },
  {
    id: "3",
    name: "Christmas Collar Set",
    price: 45.99,
    originalPrice: 59.99,
    image: img3,
    category: "Accessories",
    isBestseller: true,
  },
  {
    id: "4",
    name: "Circus Princess Gown",
    price: 79.99,
    image: img4,
    category: "Dresses",
    isNew: true,
  },
  {
    id: "5",
    name: "Royal Bunny Costume",
    price: 89.99,
    originalPrice: 109.99,
    image: img5,
    category: "Costumes",
  },
  {
    id: "6",
    name: "Elegant Blue Gown",
    price: 74.99,
    image: img6,
    category: "Formal Wear",
    isNew: true,
  },
  {
    id: "7",
    name: "Victorian Lace Dress",
    price: 69.99,
    image: img7,
    category: "Dresses",
    isBestseller: true,
  },
  {
    id: "8",
    name: "Holiday Tree Hat Set",
    price: 39.99,
    image: img1,
    category: "Accessories",
  },
];

// todo: remove mock functionality
const mockCategories = [
  {
    id: "1",
    name: "Holiday Collection",
    description: "Festive outfits for special occasions",
    image: img2,
    productCount: 24,
  },
  {
    id: "2",
    name: "Costumes & Cosplay",
    description: "Fun and creative pet costumes",
    image: img5,
    productCount: 18,
  },
  {
    id: "3",
    name: "Elegant Dresses",
    description: "Sophisticated styles for your pet",
    image: img7,
    productCount: 32,
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
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleAddToCart = (product: Product, quantity = 1, size = "M") => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity, size }];
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setCartOpen(true)}
      />

      <main>
        <HeroSection onShopNow={() => setLocation("/shop")} />
        
        <FeaturesSection />

        <ProductGrid
          products={mockProducts.slice(0, 4)}
          title="New Arrivals"
          subtitle="Fresh styles for your fur baby"
          onAddToCart={(product) => handleAddToCart(product)}
          onQuickView={setQuickViewProduct}
        />

        <CategorySection
          categories={mockCategories}
          onCategoryClick={(cat) => console.log("Navigate to:", cat.name)}
        />

        <ProductGrid
          products={mockProducts.slice(4)}
          title="Bestsellers"
          subtitle="Customer favorites"
          onAddToCart={(product) => handleAddToCart(product)}
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
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          toast({
            title: "Checkout",
            description: "Proceeding to checkout...",
          });
        }}
      />

      <ProductQuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

function ShopPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const handleAddToCart = (product: Product, quantity = 1, size = "M") => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity, size }];
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setCartOpen(true)}
      />

      <main className="pt-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8">
          <h1 className="font-serif text-4xl font-medium mb-2">Shop All</h1>
          <p className="text-muted-foreground">Discover our complete collection of premium pet clothing</p>
        </div>

        <ProductGrid
          products={mockProducts}
          onAddToCart={(product) => handleAddToCart(product)}
          onQuickView={setQuickViewProduct}
        />
      </main>

      <Footer />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={(id) => setCartItems((prev) => prev.filter((item) => item.id !== id))}
        onCheckout={() => console.log("Checkout")}
      />

      <ProductQuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

function AboutPage() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={0} onCartClick={() => setCartOpen(true)} />

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
  const [cartOpen, setCartOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={0} onCartClick={() => setCartOpen(true)} />

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

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/shop" component={ShopPage} />
      <Route path="/collections" component={ShopPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
