import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, Mail, MapPin, Phone } from "lucide-react";
import { SiInstagram, SiFacebook, SiPinterest, SiTiktok } from "react-icons/si";
import logo from "@assets/purrpawboutique_logo_1765554533163.jpg";

export default function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <img
                src={logo}
                alt="Purr & Paw Boutique"
                className="h-16 w-auto rounded-lg"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Premium pet fashion for your beloved companions. Handcrafted with love, designed for comfort.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" data-testid="link-instagram">
                <SiInstagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" data-testid="link-facebook">
                <SiFacebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" data-testid="link-pinterest">
                <SiPinterest className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" data-testid="link-tiktok">
                <SiTiktok className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-medium mb-4">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/collections/dogs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dog Clothing
                </Link>
              </li>
              <li>
                <Link href="/collections/cats" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cat Clothing
                </Link>
              </li>
              <li>
                <Link href="/collections/accessories" className="text-muted-foreground hover:text-foreground transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/collections/sale" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-medium mb-4">Customer Care</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/size-guide" className="text-muted-foreground hover:text-foreground transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-medium mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe for exclusive offers and new arrivals.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="flex-1"
                data-testid="input-newsletter-email"
              />
              <Button data-testid="button-subscribe">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>New York, NY</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>(555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>2024 Purr & Paw Boutique. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-3 w-3 fill-primary text-primary" /> for pet lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
