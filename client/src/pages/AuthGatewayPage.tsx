import { useLocation } from "wouter";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import AuthGateway from "@/components/AuthGateway";

export default function AuthGatewayPage() {
  const [, setLocation] = useLocation();
  const { getTotalItems } = useCart();
  const { toast } = useToast();

  const handleLogin = (userData: any) => {
    toast({
      title: "Welcome back!",
      description: `Signed in as ${userData.email}`,
    });
    
    // Store user data (in a real app, you'd use proper state management)
    localStorage.setItem("user", JSON.stringify(userData));
    
    // Redirect to checkout
    setLocation("/checkout");
  };

  const handleRegister = (userData: any) => {
    toast({
      title: "Account created!",
      description: `Welcome to Purr & Paw Boutique, ${userData.firstName}!`,
    });
    
    // Store user data (in a real app, you'd use proper state management)
    localStorage.setItem("user", JSON.stringify(userData));
    
    // Redirect to checkout
    setLocation("/checkout");
  };

  const handleContinueAsGuest = () => {
    const guestData = {
      id: `guest_${Date.now()}`,
      email: "",
      firstName: "",
      lastName: "",
      isGuest: true,
    };
    
    // Store guest data
    localStorage.setItem("user", JSON.stringify(guestData));
    
    // Redirect to checkout
    setLocation("/checkout");
  };

  const handleBack = () => {
    setLocation("/");
  };

  return (
    <AuthGateway
      onLogin={handleLogin}
      onRegister={handleRegister}
      onContinueAsGuest={handleContinueAsGuest}
      onBack={handleBack}
      cartItemCount={getTotalItems()}
    />
  );
}