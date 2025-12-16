import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, X, ShoppingBag, CreditCard } from "lucide-react";
import { Product } from "./ProductCard";
import { createCheckoutSession, redirectToCheckout } from "@/services/stripe";
import { useToast } from "@/hooks/use-toast";

export interface CartItem extends Product {
  quantity: number;
  size?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number, size?: string) => void;
  onRemoveItem: (id: string, size?: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 75 ? 0 : 9.99; // Free shipping over £75
  const total = subtotal + shipping;

  // Save cart items to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const handleStripeCheckout = async () => {
    if (items.length === 0) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Convert cart items to checkout format
      const checkoutItems = items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        image: item.image,
      }));

      // Create checkout session
      const { sessionId } = await createCheckoutSession({
        items: checkoutItems,
      });

      // Redirect to Stripe Checkout
      await redirectToCheckout(sessionId);
      
      // Clear cart after successful redirect
      onCheckout();
      onClose();
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout Error",
        description: error instanceof Error ? error.message : "Failed to start checkout process",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLegacyCheckout = () => {
    if (items.length === 0) {
      return;
    }
    onClose();
    onCheckout();
    setLocation("/auth-gateway");
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl">Shopping Cart</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="font-serif text-xl mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">
              Discover our beautiful collection and find something special for your pet.
            </p>
            <Button onClick={onClose} data-testid="button-continue-shopping">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size || "M"}`}
                    className="flex gap-4"
                    data-testid={`cart-item-${item.id}-${item.size}`}
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2">
                        <h4 className="font-medium truncate">{item.name}</h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 flex-shrink-0"
                          onClick={() => onRemoveItem(item.id, item.size || "M")}
                          data-testid={`button-remove-${item.id}`}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      {item.size && (
                        <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              onUpdateQuantity(item.id, Math.max(0, item.quantity - 1), item.size || "M")
                            }
                            data-testid={`button-decrease-${item.id}`}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1, item.size || "M")}
                            data-testid={`button-increase-${item.id}`}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="font-semibold">
                          £{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `£${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && items.length === 1 && (
                  <p className="text-xs text-muted-foreground">
                    Add 1 more item for free shipping
                  </p>
                )}
                {shipping > 0 && items.length > 1 && (
                  <p className="text-xs text-muted-foreground">
                    Free shipping on orders over £75
                  </p>
                )}
                {shipping === 0 && (
                  <p className="text-xs text-green-600">
                    🎉 You qualify for free shipping!
                  </p>
                )}
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
              </div>
              <div className="space-y-2">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleStripeCheckout}
                  disabled={isLoading}
                  data-testid="button-stripe-checkout"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Checkout with Stripe
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  size="lg"
                  onClick={handleLegacyCheckout}
                  data-testid="button-legacy-checkout"
                >
                  Alternative Checkout
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
