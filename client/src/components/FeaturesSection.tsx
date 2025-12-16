import { Truck, Shield, Heart, Sparkles } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $100",
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "Premium materials only",
  },
  {
    icon: Heart,
    title: "Pet-Safe",
    description: "Comfort-first designs",
  },
  {
    icon: Sparkles,
    title: "Handcrafted",
    description: "Made with love",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-8 border-y bg-muted/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="font-medium mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
