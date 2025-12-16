import { useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { Separator } from "@/components/ui/separator";
import { Truck, Clock, Globe, AlertCircle } from "lucide-react";

export default function ShippingPage() {
  const { cartOpen, setCartOpen, getTotalItems } = useCart();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={getTotalItems()} onCartClick={() => setCartOpen(true)} />

      <main className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-medium mb-4">
              Shipping & Returns
            </h1>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about our shipping and returns policy
            </p>
          </div>

          {/* Shipping Information Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                <Truck className="h-6 w-6" />
              </div>
              <h2 className="font-serif text-3xl font-medium">Shipping Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* UK Shipping */}
              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="font-serif text-xl font-medium mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  UK Shipping
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Standard:</span>
                    <div className="text-right">
                      <div className="font-medium">£2.99</div>
                      <div className="text-sm text-muted-foreground">3–5 business days</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Express:</span>
                    <div className="text-right">
                      <div className="font-medium">£4.99</div>
                      <div className="text-sm text-muted-foreground">1–2 business days</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Europe Shipping */}
              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="font-serif text-xl font-medium mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Europe Shipping
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Standard:</span>
                    <div className="text-right">
                      <div className="font-medium">£9.99</div>
                      <div className="text-sm text-muted-foreground">5–7 business days</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Express:</span>
                    <div className="text-right">
                      <div className="font-medium">£29.99</div>
                      <div className="text-sm text-muted-foreground">3–5 business days</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                <p className="text-blue-800 text-sm">
                  Please note that delivery times are estimates provided by the carrier. We are not responsible for delays once an order has been dispatched; however, we are happy to assist you in contacting the carrier if your parcel is delayed.
                </p>
              </div>
            </div>

            {/* Free Shipping Offer */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="text-green-800 text-sm">
                  <p className="font-medium mb-1">Free Shipping Offers</p>
                  <p>• First order: Free shipping on any purchase</p>
                  <p>• Subsequent orders: Free shipping on 2+ items</p>
                </div>
              </div>
            </div>

            {/* EU Shipping & Customs */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h3 className="font-serif text-xl font-medium mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                EU Shipping & Customs
              </h3>
              <div className="space-y-3 text-amber-800">
                <p>
                  Due to post-Brexit customs regulations, orders shipped to the EU with a value over €150 may be subject to additional customs duties or taxes (set by local authorities).
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Any customs charges are the responsibility of the customer.</li>
                  <li>If your parcel is held at customs, please check for notification letters, emails, or text messages requesting payment and complete the payment promptly.</li>
                  <li>Unpaid customs fees may result in the parcel being returned to us.</li>
                </ul>
              </div>
            </div>
          </section>

          <Separator className="my-12" />

          {/* Exchanges & Returns Policy Section */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h2 className="font-serif text-3xl font-medium">Exchanges & Returns Policy</h2>
            </div>

            {/* Exchanges */}
            <div className="mb-12">
              <h3 className="font-serif text-2xl font-medium mb-6">Exchanges</h3>
              <div className="prose prose-gray max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you are not fully satisfied with your purchase or the item does not fit as expected, we are happy to offer an exchange. Exchange requests must be submitted within <strong>7 days from the delivery date</strong>, as marked by the delivery service. Items must be returned unused, clean, and in resalable condition, with all original tags attached.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To request an exchange, please contact our customer service team. Once the exchange is approved, the item must be shipped back to us within 3 business days. All exchanges are subject to stock availability.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Items that are damaged, worn, soiled, or returned outside the stated timeframe may not be accepted and may be sent back to the customer. Please note that shipping and customs fees are not covered and remain the responsibility of the customer.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Purr & Paw Boutique reserves the right to limit or refuse repeated exchange requests. Affected customers will be notified with a clear explanation, and appeals may be reviewed on a case-by-case basis.
                </p>
              </div>
            </div>

            {/* Returns & Refunds */}
            <div>
              <h3 className="font-serif text-2xl font-medium mb-6">Returns & Refunds</h3>
              <div className="prose prose-gray max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We accept returns for refunds if you are not completely satisfied with your purchase. Refund requests must be made within <strong>7 days from the delivery date</strong>. Returned items must be unused, clean, and in resalable condition, with original tags attached.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To request a refund, please contact our customer service team. Items returned outside the return window or not meeting the above conditions may not be accepted.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  At this time, return shipping and customs fees are non-refundable and must be covered by the customer. Refunds beyond cases of incorrect or faulty items will be issued as store credit for the original purchase value. Currently, we are unable to provide cash refunds for more than one order per customer.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Purr & Paw Boutique reserves the right to refuse repeated refund requests. Customers will be notified accordingly, and any appeals will be reviewed after internal assessment.
                </p>
              </div>
            </div>
          </section>
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