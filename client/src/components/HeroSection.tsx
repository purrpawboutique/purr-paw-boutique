import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@assets/IMG_3137_1765554802944.jpg";

interface HeroSectionProps {
  onShopNow: () => void;
  onOurStory: () => void;
}

export default function HeroSection({ onShopNow, onOurStory }: HeroSectionProps) {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Adorable pet in premium boutique clothing"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/20" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="max-w-2xl text-center mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 tracking-wide">
            Purr & Paw Boutique
          </h1>
          <div className="space-y-2 mb-8">
            <p className="font-serif text-xl md:text-2xl text-white/95 font-light tracking-[0.2em] uppercase">
              Premium Pet Fashion
            </p>
            <p className="font-serif text-lg md:text-xl text-white/90 italic font-light">
              Dress Your Best Friend in Love
            </p>
          </div>
          <p className="font-serif text-lg text-white/85 mb-8 leading-relaxed max-w-lg mx-auto font-light">
            Discover our handcrafted collection of elegant pet clothing, designed with love for your beloved companions.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              onClick={onShopNow}
              className="bg-white text-black hover:bg-white/90 font-semibold shadow-lg"
              data-testid="button-hero-shop-now"
            >
              Shop Collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onOurStory}
              className="bg-white/20 backdrop-blur-sm text-white border-white/40 hover:bg-white/30"
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
