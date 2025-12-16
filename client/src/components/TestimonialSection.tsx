import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  petName: string;
  avatar?: string;
  petImage: string;
  rating: number;
  text: string;
}

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
            Happy Customers
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium">
            What Pet Parents Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-6" data-testid={`testimonial-${testimonial.id}`}>
              <div className="flex items-center gap-4 mb-4">
                <Avatar>
                  <AvatarImage src={testimonial.avatar} />
                  <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">Pet: {testimonial.petName}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                "{testimonial.text}"
              </p>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={testimonial.petImage}
                  alt={testimonial.petName}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
