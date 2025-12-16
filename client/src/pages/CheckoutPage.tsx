import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SimpleCheckoutForm from "@/components/SimpleCheckoutForm";
import DevelopmentCheckout from "@/components/DevelopmentCheckout";
import OrderSummary from "@/components/OrderSummary";
import { CartItem } from "@/components/CartDrawer";
import { useToast } from "@/hooks/use-toast";

// Initialize Stripe
const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
if (!publishableKey) {
  throw new Error('VITE_STRIPE_PUBLISHABLE_KEY is not set in environment variables');
}
const stripePromise = loadStripe(publishableKey);

interface CheckoutPageProps {
  cartItems?: CartItem[];
  onOrderComplete?: (orderId: string) => void;
}

export default function CheckoutPage({ cartItems = [], onOrderComplete }: CheckoutPageProps) {
  const [, setLocation] = useLocation();
  const [clientSecret, setClientSecret] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 75 ? 0 : 9.99; // Free shipping over £75
  const tax = subtotal * 0.2; // 20% VAT
  const total = subtotal + shipping + tax;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Check if user has gone through auth gateway
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      // Redirect to auth gateway if no user data
      setLocation("/auth-gateway");
      return;
    }
  }, [setLocation]);

  useEffect(() => {
    // Create PaymentIntent on component mount
    const createPaymentIntent = async () => {
      try {
        setLoading(true);
        
        // Try to create payment intent with API
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: Math.round(total * 100), // Convert to pence
            currency: "gbp",
            items: cartItems.map(item => ({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              size: item.size
            }))
          }),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.client_secret) {
          setClientSecret(data.client_secret);
        } else {
          throw new Error("No client_secret received");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error creating payment intent:", error);
        
        // Fallback for development - use a mock client secret
        if (process.env.NODE_ENV === 'development') {
          console.log("Using development fallback for Stripe");
          // This is a mock client secret for development only
          setClientSecret("pi_test_development_mock_client_secret");
          setLoading(false);
        } else {
          toast({
            title: "Payment Setup Error",
            description: "Unable to initialize secure payment. Please refresh the page or contact support.",
            variant: "destructive",
          });
          setLoading(false);
        }
      }
    };

    if (cartItems.length > 0) {
      createPaymentIntent();
    } else {
      // Redirect to cart if no items
      setLocation("/");
    }
  }, [cartItems, total, setLocation, toast]);

  const handlePaymentSuccess = (orderId: string) => {
    toast({
      title: "Payment Successful!",
      description: "Your order has been confirmed. You'll receive an email confirmation shortly.",
    });
    onOrderComplete?.(orderId);
    setLocation(`/order-confirmation/${orderId}`);
  };

  const handlePaymentError = (error: string) => {
    toast({
      title: "Payment Failed",
      description: error,
      variant: "destructive",
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartCount={0} onCartClick={() => {}} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="font-serif text-4xl font-medium mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Add some items to your cart before checking out.
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartCount={cartItems.length} onCartClick={() => {}} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Preparing your checkout...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#0f172a',
      colorBackground: '#ffffff',
      colorText: '#0f172a',
      colorDanger: '#dc2626',
      fontFamily: 'Inter, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cartItems.length} onCartClick={() => {}} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center justify-center space-x-2 text-sm text-muted-foreground mb-8">
          <button 
            onClick={() => setLocation("/")}
            className="hover:text-foreground transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <button 
            onClick={() => setLocation("/shop")}
            className="hover:text-foreground transition-colors"
          >
            Shop
          </button>
          <span>/</span>
          <span className="text-foreground">Checkout</span>
        </nav>

        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-medium mb-2">Secure Checkout</h1>
          <p className="text-muted-foreground">Complete your order in just a few steps</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Checkout Form */}
          <div className="order-2 lg:order-1">
            {/* Use development checkout if we're in development and no client secret */}
            {!clientSecret && !loading && (
              <DevelopmentCheckout
                cartItems={cartItems}
                total={total}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
              />
            )}
            
            {clientSecret && clientSecret !== "pi_test_development_mock_client_secret" && (
              <Elements options={options} stripe={stripePromise}>
                <SimpleCheckoutForm
                  cartItems={cartItems}
                  total={total}
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                />
              </Elements>
            )}
            
            {clientSecret === "pi_test_development_mock_client_secret" && (
              <DevelopmentCheckout
                cartItems={cartItems}
                total={total}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
              />
            )}
            
            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Initializing secure payment...</p>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="order-1 lg:order-2">
            <div className="sticky top-8">
              <OrderSummary
                items={cartItems}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}