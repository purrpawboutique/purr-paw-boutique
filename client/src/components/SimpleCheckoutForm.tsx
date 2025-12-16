import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/components/CartDrawer";
import { Loader2, CreditCard } from "lucide-react";

const checkoutSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  saveInfo: z.boolean().default(false),
  marketingEmails: z.boolean().default(false),
  sameAsShipping: z.boolean().default(true),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface SimpleCheckoutFormProps {
  cartItems: CartItem[];
  total: number;
  onPaymentSuccess: (orderId: string) => void;
  onPaymentError: (error: string) => void;
}

export default function SimpleCheckoutForm({
  cartItems,
  total,
  onPaymentSuccess,
  onPaymentError,
}: SimpleCheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      saveInfo: false,
      marketingEmails: false,
      sameAsShipping: true,
    },
  });

  const watchSameAsShipping = watch("sameAsShipping");

  const onSubmit = async (data: CheckoutFormData) => {
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      // Check if we're in development mode with mock client secret
      const isDevelopmentMock = window.location.hostname === 'localhost' && 
        elements.getElement('payment')?.getValue === undefined;

      if (isDevelopmentMock) {
        // Simulate successful payment in development
        setTimeout(() => {
          const orderId = `order_${Date.now()}`;
          onPaymentSuccess(orderId);
          setIsLoading(false);
        }, 2000);
        return;
      }

      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-confirmation`,
          receipt_email: data.email,
        },
        redirect: "if_required",
      });

      if (error) {
        onPaymentError(error.message || "An unexpected error occurred.");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // Generate a mock order ID (in real app, this would come from your backend)
        const orderId = `order_${Date.now()}`;
        onPaymentSuccess(orderId);
      }
    } catch (err) {
      console.error("Payment error:", err);
      onPaymentError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Contact Information */}
      <Card className="p-6">
        <h2 className="font-serif text-xl font-medium mb-4 flex items-center">
          <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium mr-3">
            1
          </span>
          Contact Information
        </h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...register("email")}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                placeholder="John"
                {...register("firstName")}
                className={errors.firstName ? "border-destructive" : ""}
              />
              {errors.firstName && (
                <p className="text-sm text-destructive mt-1">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                {...register("lastName")}
                className={errors.lastName ? "border-destructive" : ""}
              />
              {errors.lastName && (
                <p className="text-sm text-destructive mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+44 7700 900000"
              {...register("phone")}
              className={errors.phone ? "border-destructive" : ""}
            />
            {errors.phone && (
              <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="saveInfo" {...register("saveInfo")} />
              <Label htmlFor="saveInfo" className="text-sm">
                Save this information for next time
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="marketingEmails" {...register("marketingEmails")} />
              <Label htmlFor="marketingEmails" className="text-sm">
                Email me with news and offers
              </Label>
            </div>
          </div>
        </div>
      </Card>

      {/* Shipping Address */}
      <Card className="p-6">
        <h2 className="font-serif text-xl font-medium mb-4 flex items-center">
          <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium mr-3">
            2
          </span>
          Shipping Address
        </h2>
        
        <div className="space-y-4">
          <AddressElement
            options={{
              mode: "shipping",
              allowedCountries: ["GB", "US", "CA", "AU"],
            }}
          />
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <h3 className="font-medium">Shipping Method</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border rounded-lg bg-primary/5 border-primary">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="standard"
                  name="shipping"
                  value="standard"
                  defaultChecked
                  className="text-primary"
                />
                <div>
                  <Label htmlFor="standard" className="font-medium">
                    Standard Delivery
                  </Label>
                  <p className="text-sm text-muted-foreground">5-7 business days</p>
                </div>
              </div>
              <span className="font-medium">£9.99</span>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="express"
                  name="shipping"
                  value="express"
                  className="text-primary"
                />
                <div>
                  <Label htmlFor="express" className="font-medium">
                    Express Delivery
                  </Label>
                  <p className="text-sm text-muted-foreground">2-3 business days</p>
                </div>
              </div>
              <span className="font-medium">£19.99</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Payment Information */}
      <Card className="p-6">
        <h2 className="font-serif text-xl font-medium mb-4 flex items-center">
          <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium mr-3">
            3
          </span>
          Payment Information
        </h2>
        
        <div className="space-y-4">
          <PaymentElement />
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="sameAsShipping" {...register("sameAsShipping")} />
            <Label htmlFor="sameAsShipping" className="text-sm">
              Billing address is the same as shipping address
            </Label>
          </div>

          {!watchSameAsShipping && (
            <div className="mt-4">
              <h3 className="font-medium mb-3">Billing Address</h3>
              <AddressElement
                options={{
                  mode: "billing",
                  allowedCountries: ["GB", "US", "CA", "AU"],
                }}
              />
            </div>
          )}
        </div>
      </Card>

      {/* Checkout Button */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-lg font-medium">Complete Your Order</h3>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-2xl font-bold">£{total.toFixed(2)}</p>
          </div>
        </div>
        
        <Button
          type="submit"
          disabled={!stripe || isLoading}
          className="w-full h-12 text-lg"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing Payment...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-5 w-5" />
              Complete Order - £{total.toFixed(2)}
            </>
          )}
        </Button>
        
        <p className="text-xs text-muted-foreground text-center mt-3">
          Your payment information is secure and encrypted
        </p>
      </Card>
    </form>
  );
}