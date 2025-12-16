import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Package, 
  Truck, 
  Mail, 
  Download,
  ArrowRight,
  Calendar,
  MapPin
} from "lucide-react";

// Mock order data - in a real app, this would come from your API
interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
}

interface Order {
  id: string;
  orderNumber: string;
  status: "confirmed" | "processing" | "shipped" | "delivered";
  createdAt: string;
  estimatedDelivery: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: {
    type: string;
    last4: string;
  };
}

const mockOrder: Order = {
  id: "order_1234567890",
  orderNumber: "PPB-2024-001234",
  status: "confirmed",
  createdAt: "2024-12-15T10:30:00Z",
  estimatedDelivery: "2024-12-22T00:00:00Z",
  items: [
    {
      id: "1",
      name: "Holiday Christmas Cape",
      image: "/api/placeholder/100/100",
      price: 59.99,
      quantity: 1,
      size: "M"
    },
    {
      id: "3",
      name: "Christmas Collar Set",
      image: "/api/placeholder/100/100",
      price: 45.99,
      quantity: 1,
      size: "S"
    }
  ],
  subtotal: 105.98,
  shipping: 0,
  tax: 21.20,
  total: 127.18,
  shippingAddress: {
    name: "John Doe",
    street: "123 Pet Street",
    city: "London",
    postalCode: "SW1A 1AA",
    country: "United Kingdom"
  },
  paymentMethod: {
    type: "Visa",
    last4: "4242"
  }
};

export default function OrderConfirmationPage() {
  const [match, params] = useRoute("/order-confirmation/:orderId?");
  const [, setLocation] = useLocation();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Simulate API call to fetch order details
    const fetchOrder = async () => {
      setLoading(true);
      
      // In a real app, you'd fetch the order from your API
      setTimeout(() => {
        setOrder(mockOrder);
        setLoading(false);
      }, 1000);
    };

    if (match) {
      fetchOrder();
    }
  }, [match, params?.orderId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!match) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartCount={0} onCartClick={() => {}} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading order details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartCount={0} onCartClick={() => {}} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="font-serif text-4xl font-medium mb-4">Order Not Found</h1>
            <p className="text-muted-foreground mb-8">
              We couldn't find the order you're looking for.
            </p>
            <Button onClick={() => setLocation("/")}>
              Return Home
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={0} onCartClick={() => {}} />
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="font-serif text-3xl font-medium mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. We've received your order and will send you a confirmation email shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Info */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl font-medium">Order Details</h2>
                <Badge className={`${getStatusColor(order.status)} border-0`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Order Number</p>
                  <p className="font-medium">{order.orderNumber}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Order Date</p>
                  <p className="font-medium">{formatDate(order.createdAt)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Payment Method</p>
                  <p className="font-medium">{order.paymentMethod.type} •••• {order.paymentMethod.last4}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Estimated Delivery</p>
                  <p className="font-medium">{formatDate(order.estimatedDelivery)}</p>
                </div>
              </div>
            </Card>

            {/* Order Items */}
            <Card className="p-6">
              <h2 className="font-serif text-xl font-medium mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Size: {item.size} • Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">£{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>£{order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>
                    {order.shipping === 0 ? (
                      <span className="text-green-600 font-medium">Free</span>
                    ) : (
                      `£${order.shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>VAT (20%)</span>
                  <span>£{order.tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>£{order.total.toFixed(2)}</span>
                </div>
              </div>
            </Card>

            {/* Shipping Address */}
            <Card className="p-6">
              <h2 className="font-serif text-xl font-medium mb-4">Shipping Address</h2>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">{order.shippingAddress.name}</p>
                  <p className="text-muted-foreground">{order.shippingAddress.street}</p>
                  <p className="text-muted-foreground">
                    {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                  </p>
                  <p className="text-muted-foreground">{order.shippingAddress.country}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Status */}
            <Card className="p-6">
              <h3 className="font-medium mb-4">Order Status</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Order Confirmed</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Processing</p>
                    <p className="text-xs text-muted-foreground">1-2 business days</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Shipped</p>
                    <p className="text-xs text-muted-foreground">You'll receive tracking info</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="font-medium mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Order Details
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download Invoice
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  size="sm"
                  onClick={() => setLocation("/shop")}
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Button>
              </div>
            </Card>

            {/* Expected Delivery */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Expected Delivery</h3>
              </div>
              <p className="text-2xl font-serif font-medium mb-1">
                {formatDate(order.estimatedDelivery)}
              </p>
              <p className="text-sm text-muted-foreground">
                We'll send you tracking information once your order ships.
              </p>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}