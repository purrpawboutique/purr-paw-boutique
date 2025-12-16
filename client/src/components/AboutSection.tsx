import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import aboutImage from "@assets/IMG_3073_1765554816106.jpg";

interface AboutSectionProps {
  onLearnMore: () => void;
}

export default function AboutSection({ onLearnMore }: AboutSectionProps) {
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-lg overflow-hidden">
              <img
                src={aboutImage}
                alt="Cat in elegant blue dress"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-lg -z-10" />
          </div>
          
          <div>
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
              Our Story
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6">
              Crafted with Love for Your Beloved Pets
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                At Purr & Paw Boutique, we believe every pet deserves to feel special. Our journey began with a simple idea: to create beautiful, comfortable clothing that celebrates the unique bond between pets and their families.
              </p>
              <p>
                Each piece in our collection is thoughtfully designed using premium, pet-safe materials. We pay attention to every detail, from the softness of fabrics to the ease of wear, ensuring your furry friends look adorable while feeling comfortable.
              </p>
              <p>
                Our designs range from elegant everyday wear to show-stopping special occasion pieces, because we know your pet is family, and family deserves the best.
              </p>
            </div>
            <Button
              variant="outline"
              size="lg"
              className="mt-8"
              onClick={onLearnMore}
              data-testid="button-learn-more"
            >
              Learn More About Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
