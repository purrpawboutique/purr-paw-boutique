import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CartItem } from "@/components/CartDrawer";
import { Truck, Shield, RotateCcw } from "lucide-react";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export default function OrderSummary({
  items,
  subtotal,
  shipping,
  tax,
  total,
}: OrderSummaryProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="font-serif text-xl font-medium mb-4">Order Summary</h2>
        
        <div className="space-y-4">
          {items.map((item) => (
            <div key={`${item.id}-${item.size}`} className="flex items-start gap-4">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <Badge
                  variant="secondary"
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {item.quantity}
                </Badge>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Size: {item.size} | Qty: {item.quantity}
                </p>
                <p className="text-sm font-medium mt-1">
                  £{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>£{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>
              {shipping === 0 ? (
                <span className="text-green-600 font-medium">Free</span>
              ) : (
                `£${shipping.toFixed(2)}`
              )}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>VAT (20%)</span>
            <span>£{tax.toFixed(2)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-medium text-lg">
            <span>Total</span>
            <span>£{total.toFixed(2)}</span>
          </div>
        </div>

        {shipping === 0 && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800 font-medium">
              🎉 You qualify for free shipping!
            </p>
          </div>
        )}

        {items.length === 1 && shipping > 0 && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              Add 1 more item for free shipping
            </p>
          </div>
        )}

        {items.length > 1 && subtotal < 75 && shipping > 0 && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              Add £{(75 - subtotal).toFixed(2)} more for free shipping
            </p>
          </div>
        )}
      </Card>

      {/* Trust Indicators */}
      <Card className="p-6">
        <h3 className="font-medium mb-4">Why Shop With Us?</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Truck className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Free Shipping Offers</p>
              <p className="text-xs text-muted-foreground">
                First order free • 2+ items free • Over £75 free
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <RotateCcw className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">30-Day Returns</p>
              <p className="text-xs text-muted-foreground">
                Easy returns if you're not completely satisfied
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Shield className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Secure Payments</p>
              <p className="text-xs text-muted-foreground">
                Your payment information is always protected
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Accepted Payment Methods */}
      <Card className="p-6">
        <h3 className="font-medium mb-3">Accepted Payment Methods</h3>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="px-3 py-1 bg-muted rounded text-xs font-medium">Visa</div>
          <div className="px-3 py-1 bg-muted rounded text-xs font-medium">Mastercard</div>
          <div className="px-3 py-1 bg-muted rounded text-xs font-medium">American Express</div>
          <div className="px-3 py-1 bg-muted rounded text-xs font-medium">PayPal</div>
          <div className="px-3 py-1 bg-muted rounded text-xs font-medium">Apple Pay</div>
          <div className="px-3 py-1 bg-muted rounded text-xs font-medium">Google Pay</div>
        </div>
      </Card>
    </div>
  );
}