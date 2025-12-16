import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import bannerImage from "@assets/IMG_3137_1765554802944.jpg";

export default function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Welcome to the family!",
        description: "Thank you for subscribing. Check your inbox for exclusive offers.",
      });
      setEmail("");
    }
  };

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={bannerImage}
          alt="Pet in costume"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-medium text-white mb-4">
          Join Our Pack
        </h2>
        <p className="text-white/80 max-w-md mx-auto mb-8">
          Subscribe for 15% off your first order, plus exclusive access to new arrivals and special promotions.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            data-testid="input-banner-email"
          />
          <Button type="submit" data-testid="button-banner-subscribe">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
