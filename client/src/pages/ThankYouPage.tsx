import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Package, Truck, Mail, ArrowLeft } from "lucide-react";
import { getCheckoutSession } from "@/services/stripe";
import { useCart } from "@/contexts/CartContext";

interface CheckoutSession {
  id: string;
  payment_status: string;
  customer_details: {
    name: string;
    email: string;
  };
  amount_total: number;
  currency: string;
  line_items: {
    data: Array<{
      description: string;
      quantity: number;
      amount_total: number;
    }>;
  };
}

export default function ThankYouPage() {
  const [, setLocation] = useLocation();
  const [match] = useRoute("/thank-you");
  const [session, setSession] = useState<CheckoutSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { clearCart } = useCart();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');

    if (sessionId) {
      fetchSessionDetails(sessionId);
      // Clear the cart since payment was successful
      clearCart();
    } else {
      setError("No session ID found");
      setLoading(false);
    }
  }, [clearCart]);

  const fetchSessionDetails = async (sessionId: string) => {
    try {
      const sessionData = await getCheckoutSession(sessionId);
      setSession(sessionData);
    } catch (err) {
      console.error("Error fetching session:", err);
      setError("Failed to load order details");
    } finally {
      setLoading(false);
    }
  };

  const generateOrderNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const timestamp = Date.now().toString().slice(-6);
    return `PPB-${year}-${timestamp}`;
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your order details...</p>
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <div className="text-red-500 mb-4">
              <Mail className="h-12 w-12 mx-auto" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Order Details Unavailable</h2>
            <p className="text-muted-foreground mb-4">
              {error || "We couldn't load your order details, but your payment was processed successfully."}
            </p>
            <Button onClick={() => setLocation("/")} className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const orderNumber = generateOrderNumber();
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">
              Thank You for Your Order!
            </h1>
            <p className="text-lg text-muted-foreground">
              Your payment has been processed successfully
            </p>
          </div>

          {/* Order Summary Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Order Confirmation</span>
                <span className="text-sm font-normal text-muted-foreground">
                  #{orderNumber}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Customer</p>
                  <p className="font-medium">{session.customer_details?.name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium">{session.customer_details?.email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Payment Status</p>
                  <p className="font-medium capitalize text-green-600">
                    {session.payment_status}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total Paid</p>
                  <p className="font-medium">
                    {formatAmount(session.amount_total, session.currency)}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Order Items */}
              <div>
                <h3 className="font-medium mb-3">Items Ordered</h3>
                <div className="space-y-2">
                  {session.line_items?.data?.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.description} × {item.quantity}</span>
                      <span>{formatAmount(item.amount_total, session.currency)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="mr-2 h-5 w-5" />
                What Happens Next?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-pink-600">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Order Confirmation</p>
                    <p className="text-sm text-muted-foreground">
                      You'll receive an email confirmation shortly with your order details.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-pink-600">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Processing</p>
                    <p className="text-sm text-muted-foreground">
                      We'll carefully prepare your items for shipping within 1-2 business days.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                    <Truck className="h-3 w-3 text-pink-600" />
                  </div>
                  <div>
                    <p className="font-medium">Shipping</p>
                    <p className="text-sm text-muted-foreground">
                      Estimated delivery: {estimatedDelivery.toLocaleDateString('en-GB', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => setLocation("/")} 
              className="flex-1"
            >
              Continue Shopping
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setLocation("/shipping")}
              className="flex-1"
            >
              Shipping Info
            </Button>
          </div>

          {/* Support Note */}
          <div className="text-center mt-8 p-4 bg-pink-50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Need help with your order? Contact us at{" "}
              <a href="mailto:support@purrpawboutique.uk" className="text-pink-600 hover:underline">
                support@purrpawboutique.uk
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}