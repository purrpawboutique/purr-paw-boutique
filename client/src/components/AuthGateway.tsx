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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  Lock, 
  ShoppingBag, 
  ArrowRight, 
  Eye, 
  EyeOff,
  UserPlus,
  LogIn
} from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().default(false),
});

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
  agreeToTerms: z.boolean().refine(val => val === true, "You must agree to the terms"),
  marketingEmails: z.boolean().default(false),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

interface AuthGatewayProps {
  onLogin: (userData: any) => void;
  onRegister: (userData: any) => void;
  onContinueAsGuest: () => void;
  onBack: () => void;
  cartItemCount: number;
}

export default function AuthGateway({
  onLogin,
  onRegister,
  onContinueAsGuest,
  onBack,
  cartItemCount,
}: AuthGatewayProps) {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
      marketingEmails: false,
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: "user_123",
        email: data.email,
        firstName: "John",
        lastName: "Doe",
        isGuest: false,
      };
      onLogin(userData);
      setIsLoading(false);
    }, 1500);
  };

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: "user_new_123",
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        isGuest: false,
      };
      onRegister(userData);
      setIsLoading(false);
    }, 1500);
  };

  const handleContinueAsGuest = () => {
    const guestData = {
      id: `guest_${Date.now()}`,
      email: "",
      firstName: "",
      lastName: "",
      isGuest: true,
    };
    onContinueAsGuest();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-serif text-2xl font-medium mb-2">Almost There!</h1>
          <p className="text-muted-foreground">
            You have {cartItemCount} item{cartItemCount !== 1 ? 's' : ''} ready to checkout
          </p>
        </div>

        {/* Continue as Guest Option */}
        <Card className="p-6 mb-6 bg-primary/5 border-primary/20">
          <div className="text-center">
            <h3 className="font-medium mb-2">Continue as Guest</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Checkout quickly without creating an account
            </p>
            <Button 
              onClick={handleContinueAsGuest}
              className="w-full"
              size="lg"
            >
              <ArrowRight className="mr-2 h-4 w-4" />
              Continue as Guest
            </Button>
          </div>
        </Card>

        <div className="text-center mb-4">
          <span className="text-sm text-muted-foreground bg-background px-3">
            Or sign in for a better experience
          </span>
        </div>

        {/* Login/Register Tabs */}
        <Card className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Sign In
              </TabsTrigger>
              <TabsTrigger value="register" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Sign Up
              </TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login">
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10"
                      {...loginForm.register("email")}
                    />
                  </div>
                  {loginForm.formState.errors.email && (
                    <p className="text-sm text-destructive mt-1">
                      {loginForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
                      {...loginForm.register("password")}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {loginForm.formState.errors.password && (
                    <p className="text-sm text-destructive mt-1">
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember-me" 
                      {...loginForm.register("rememberMe")}
                    />
                    <Label htmlFor="remember-me" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  <Button variant="link" className="p-0 h-auto text-sm">
                    Forgot password?
                  </Button>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            {/* Register Form */}
            <TabsContent value="register">
              <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      {...registerForm.register("firstName")}
                    />
                    {registerForm.formState.errors.firstName && (
                      <p className="text-sm text-destructive mt-1">
                        {registerForm.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      {...registerForm.register("lastName")}
                    />
                    {registerForm.formState.errors.lastName && (
                      <p className="text-sm text-destructive mt-1">
                        {registerForm.formState.errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="register-email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10"
                      {...registerForm.register("email")}
                    />
                  </div>
                  {registerForm.formState.errors.email && (
                    <p className="text-sm text-destructive mt-1">
                      {registerForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="register-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="pl-10 pr-10"
                      {...registerForm.register("password")}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {registerForm.formState.errors.password && (
                    <p className="text-sm text-destructive mt-1">
                      {registerForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="pl-10 pr-10"
                      {...registerForm.register("confirmPassword")}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {registerForm.formState.errors.confirmPassword && (
                    <p className="text-sm text-destructive mt-1">
                      {registerForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="agree-terms" 
                      {...registerForm.register("agreeToTerms")}
                    />
                    <Label htmlFor="agree-terms" className="text-sm">
                      I agree to the{" "}
                      <Button variant="link" className="p-0 h-auto text-sm">
                        Terms of Service
                      </Button>{" "}
                      and{" "}
                      <Button variant="link" className="p-0 h-auto text-sm">
                        Privacy Policy
                      </Button>
                    </Label>
                  </div>
                  {registerForm.formState.errors.agreeToTerms && (
                    <p className="text-sm text-destructive">
                      {registerForm.formState.errors.agreeToTerms.message}
                    </p>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="marketing-emails" 
                      {...registerForm.register("marketingEmails")}
                    />
                    <Label htmlFor="marketing-emails" className="text-sm">
                      Send me special offers and updates
                    </Label>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Back Button */}
        <div className="text-center mt-6">
          <Button variant="ghost" onClick={onBack}>
            ← Back to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}