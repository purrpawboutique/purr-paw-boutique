import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@assets/IMG_3081_1765554779089.jpg";

interface HeroSectionProps {
  onShopNow: () => void;
}

export default function HeroSection({ onShopNow }: HeroSectionProps) {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Adorable pet in premium boutique clothing"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="max-w-xl">
          <p className="text-sm uppercase tracking-widest text-white/80 mb-4 font-medium">
            Premium Pet Fashion
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight mb-6">
            Dress Your Best Friend in Love
          </h1>
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            Discover our handcrafted collection of elegant pet clothing, designed with love for your beloved companions.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              onClick={onShopNow}
              className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
              data-testid="button-hero-shop-now"
            >
              Shop Collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
              data-testid="button-hero-learn-more"
            >
              Our Story
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
