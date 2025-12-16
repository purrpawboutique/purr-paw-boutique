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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CartItem } from "@/components/CartDrawer";
import { Loader2, CreditCard, Truck, User } from "lucide-react";

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

interface CheckoutFormProps {
  cartItems: CartItem[];
  total: number;
  onPaymentSuccess: (orderId: string) => void;
  onPaymentError: (error: string) => void;
}

export default function CheckoutForm({
  cartItems,
  total,
  onPaymentSuccess,
  onPaymentError,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState("payment");

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
      onPaymentError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { id: "contact", label: "Contact", icon: User },
    { id: "shipping", label: "Shipping", icon: Truck },
    { id: "payment", label: "Payment", icon: CreditCard },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = step.id === currentStep;
          const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
          
          return (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  isActive || isCompleted
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-muted-foreground text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <span
                className={`ml-2 text-sm font-medium ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 h-0.5 mx-4 ${
                    isCompleted ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      <Tabs value={currentStep} onValueChange={setCurrentStep} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>

        {/* Contact Information */}
        <TabsContent value="contact" className="space-y-6">
          <Card className="p-6">
            <h2 className="font-serif text-xl font-medium mb-4">Contact Information</h2>
            
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

            <div className="flex justify-end mt-6">
              <Button
                type="button"
                onClick={() => setCurrentStep("shipping")}
                className="min-w-[120px]"
              >
                Continue to Shipping
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Shipping Information */}
        <TabsContent value="shipping" className="space-y-6">
          <Card className="p-6">
            <h2 className="font-serif text-xl font-medium mb-4">Shipping Address</h2>
            
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
                <div className="flex items-center justify-between p-4 border rounded-lg">
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

            <div className="flex justify-between mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep("contact")}
              >
                Back to Contact
              </Button>
              <Button
                type="button"
                onClick={() => setCurrentStep("payment")}
                className="min-w-[120px]"
              >
                Continue to Payment
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Payment Information */}
        <TabsContent value="payment" className="space-y-6">
          <Card className="p-6">
            <h2 className="font-serif text-xl font-medium mb-4">Payment Information</h2>
            
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

            <div className="flex justify-between mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep("shipping")}
              >
                Back to Shipping
              </Button>
              <Button
                type="submit"
                disabled={!stripe || isLoading}
                className="min-w-[140px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Complete Order - £${total.toFixed(2)}`
                )}
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  );
}