import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/components/CartDrawer";
import { Loader2, CreditCard, AlertTriangle } from "lucide-react";

const checkoutSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter your address"),
  city: z.string().min(2, "Please enter your city"),
  postalCode: z.string().min(5, "Please enter your postal code"),
  country: z.string().min(2, "Please select your country"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface DevelopmentCheckoutProps {
  cartItems: CartItem[];
  total: number;
  onPaymentSuccess: (orderId: string) => void;
  onPaymentError: (error: string) => void;
}

export default function DevelopmentCheckout({
  cartItems,
  total,
  onPaymentSuccess,
  onPaymentError,
}: DevelopmentCheckoutProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "test@example.com",
      firstName: "John",
      lastName: "Doe",
      phone: "+44 7700 900000",
      address: "123 Pet Street",
      city: "London",
      postalCode: "SW1A 1AA",
      country: "United Kingdom",
    },
  });

  const onSubmit = async (data: CheckoutFormData) => {
    setIsLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      const orderId = `dev_order_${Date.now()}`;
      onPaymentSuccess(orderId);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Development Notice */}
      <Card className="p-4 bg-yellow-50 border-yellow-200">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <div>
            <h3 className="font-medium text-yellow-800">Development Mode</h3>
            <p className="text-sm text-yellow-700">
              This is a demo checkout. No real payment will be processed.
            </p>
          </div>
        </div>
      </Card>

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
              {...register("phone")}
              className={errors.phone ? "border-destructive" : ""}
            />
            {errors.phone && (
              <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
            )}
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
          <div>
            <Label htmlFor="address">Address *</Label>
            <Input
              id="address"
              {...register("address")}
              className={errors.address ? "border-destructive" : ""}
            />
            {errors.address && (
              <p className="text-sm text-destructive mt-1">{errors.address.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                {...register("city")}
                className={errors.city ? "border-destructive" : ""}
              />
              {errors.city && (
                <p className="text-sm text-destructive mt-1">{errors.city.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="postalCode">Postal Code *</Label>
              <Input
                id="postalCode"
                {...register("postalCode")}
                className={errors.postalCode ? "border-destructive" : ""}
              />
              {errors.postalCode && (
                <p className="text-sm text-destructive mt-1">{errors.postalCode.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="country">Country *</Label>
            <Input
              id="country"
              {...register("country")}
              className={errors.country ? "border-destructive" : ""}
            />
            {errors.country && (
              <p className="text-sm text-destructive mt-1">{errors.country.message}</p>
            )}
          </div>
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
              <span className="font-medium">Free</span>
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
        
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-3">
            <CreditCard className="h-8 w-8 text-muted-foreground" />
            <div>
              <p className="font-medium">Demo Payment Method</p>
              <p className="text-sm text-muted-foreground">
                •••• •••• •••• 4242 (Test Card)
              </p>
            </div>
          </div>
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
          disabled={isLoading}
          className="w-full h-12 text-lg"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing Demo Order...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-5 w-5" />
              Complete Demo Order - £{total.toFixed(2)}
            </>
          )}
        </Button>
        
        <p className="text-xs text-muted-foreground text-center mt-3">
          This is a demonstration checkout - no real payment will be processed
        </p>
      </Card>
    </form>
  );
}