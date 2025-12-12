import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { Product } from "./ProductCard";

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, size: string) => void;
}

const sizes = ["XS", "S", "M", "L", "XL"];

export default function ProductQuickView({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductQuickViewProps) {
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedSize);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex flex-wrap gap-2 mb-2">
              {product.isNew && <Badge>New</Badge>}
              {product.isBestseller && <Badge variant="secondary">Bestseller</Badge>}
              {discount > 0 && <Badge variant="destructive">-{discount}%</Badge>}
            </div>

            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">
              {product.category}
            </p>
            <h2 className="font-serif text-2xl font-medium mb-2" data-testid="text-quickview-name">
              {product.name}
            </h2>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-semibold" data-testid="text-quickview-price">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              This beautifully crafted piece is designed for comfort and style. Made with premium, pet-safe materials that are gentle on your pet's skin.
            </p>

            <Separator className="mb-6" />

            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3">Size</h4>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    data-testid={`button-size-${size}`}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3">Quantity</h4>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  data-testid="button-quickview-decrease"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  data-testid="button-quickview-increase"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-3 mt-auto">
              <Button
                className="flex-1"
                size="lg"
                onClick={handleAddToCart}
                data-testid="button-quickview-add-to-cart"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" data-testid="button-quickview-wishlist">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
