import { useCart } from "@/contexts/CartContext";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RotateCcw, Clock, Shield, Mail } from "lucide-react";

export default function ReturnsPage() {
  const { cartOpen, setCartOpen, getTotalItems } = useCart();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl font-medium mb-4">
            Returns & Refunds
          </h1>
          <p className="text-lg text-muted-foreground">
            Your satisfaction is our priority. Learn about our return policy and process.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        {/* Quick Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center">
            <RotateCcw className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h3 className="font-medium mb-2">30-Day Returns</h3>
            <p className="text-sm text-muted-foreground">
              Return items within 30 days of delivery
            </p>
          </Card>
          <Card className="p-6 text-center">
            <Shield className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h3 className="font-medium mb-2">Quality Guarantee</h3>
            <p className="text-sm text-muted-foreground">
              We stand behind the quality of our products
            </p>
          </Card>
          <Card className="p-6 text-center">
            <Clock className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h3 className="font-medium mb-2">Fast Processing</h3>
            <p className="text-sm text-muted-foreground">
              Refunds processed within 5-7 business days
            </p>
          </Card>
        </div>

        {/* Return Policy */}
        <div className="space-y-8">
          <section>
            <h2 className="font-serif text-2xl font-medium mb-4">Return Policy</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-muted-foreground mb-4">
                We want you and your pet to be completely satisfied with your purchase. 
                If for any reason you're not happy with your order, we offer a 30-day return policy.
              </p>
              
              <h3 className="font-medium text-lg mb-3">Eligible Items</h3>
              <ul className="space-y-2 text-muted-foreground mb-6">
                <li>• Items must be returned within 30 days of delivery</li>
                <li>• Items must be in original condition with tags attached</li>
                <li>• Items must be unworn and unwashed</li>
                <li>• Original packaging must be included</li>
              </ul>

              <h3 className="font-medium text-lg mb-3">Non-Returnable Items</h3>
              <ul className="space-y-2 text-muted-foreground mb-6">
                <li>• Haute Couture custom-made items (due to personalization)</li>
                <li>• Items damaged by pets or normal wear</li>
                <li>• Items returned after 30 days</li>
                <li>• Sale items marked as "Final Sale"</li>
              </ul>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="font-serif text-2xl font-medium mb-4">How to Return</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-medium">
                  1
                </div>
                <div>
                  <h3 className="font-medium mb-1">Contact Us</h3>
                  <p className="text-muted-foreground">
                    Email us at returns@purrpawboutique.uk with your order number and reason for return.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-medium">
                  2
                </div>
                <div>
                  <h3 className="font-medium mb-1">Receive Return Label</h3>
                  <p className="text-muted-foreground">
                    We'll send you a prepaid return shipping label within 24 hours.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-medium">
                  3
                </div>
                <div>
                  <h3 className="font-medium mb-1">Pack & Ship</h3>
                  <p className="text-muted-foreground">
                    Pack items securely in original packaging and attach the return label.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-medium">
                  4
                </div>
                <div>
                  <h3 className="font-medium mb-1">Receive Refund</h3>
                  <p className="text-muted-foreground">
                    Once we receive and inspect your return, we'll process your refund within 5-7 business days.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="font-serif text-2xl font-medium mb-4">Refund Information</h2>
            <div className="prose prose-gray max-w-none">
              <ul className="space-y-2 text-muted-foreground mb-6">
                <li>• Refunds will be issued to the original payment method</li>
                <li>• Shipping costs are non-refundable (except for defective items)</li>
                <li>• Custom/personalized items are non-refundable</li>
                <li>• Refund processing time: 5-7 business days after we receive your return</li>
              </ul>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="font-serif text-2xl font-medium mb-4">Exchanges</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-muted-foreground mb-4">
                We currently don't offer direct exchanges. If you need a different size or color, 
                please return the original item and place a new order for the desired item.
              </p>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="font-serif text-2xl font-medium mb-4">Damaged or Defective Items</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-muted-foreground mb-4">
                If you receive a damaged or defective item, please contact us immediately at 
                support@purrpawboutique.uk with photos of the item. We'll arrange for a replacement 
                or full refund, including return shipping costs.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <Card className="p-6 bg-muted/30">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Need Help?</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Have questions about returns or need assistance? We're here to help.
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Returns:</strong> returns@purrpawboutique.uk</p>
              <p><strong>Support:</strong> support@purrpawboutique.uk</p>
              <p><strong>Response Time:</strong> Within 24 hours</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}