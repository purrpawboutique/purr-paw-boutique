import { useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isBestseller?: boolean;
  isOutOfStock?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onQuickView }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [, setLocation] = useLocation();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card
      className="group overflow-visible border-0 bg-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-product-${product.id}`}
    >
      <div 
        className="relative aspect-square overflow-hidden rounded-t-lg cursor-pointer"
        onClick={() => setLocation(`/product/${product.id}`)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 ? (
            <>
              <Badge variant="destructive" className="text-xs">
                Sale
              </Badge>
              <Badge variant="destructive" className="text-xs">
                -{discount}%
              </Badge>
            </>
          ) : (
            <>
              {product.isNew && (
                <Badge variant="default" className="text-xs">
                  New
                </Badge>
              )}
              {product.isBestseller && (
                <Badge variant="secondary" className="text-xs">
                  Bestseller
                </Badge>
              )}
            </>
          )}
        </div>

        <Button
          size="icon"
          variant="secondary"
          className={`absolute top-3 right-3 transition-opacity ${
            isHovered || isWishlisted ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsWishlisted(!isWishlisted)}
          data-testid={`button-wishlist-${product.id}`}
        >
          <Heart
            className={`h-4 w-4 ${isWishlisted ? "fill-primary text-primary" : ""}`}
          />
        </Button>

        <div
          className={`absolute inset-x-3 bottom-3 flex gap-2 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <Button
            variant="secondary"
            className="flex-1 bg-white/95 text-foreground shadow-lg"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            data-testid={`button-add-to-cart-${product.id}`}
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button
            variant="outline"
            className="bg-white/95 shadow-lg"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setLocation(`/product/${product.id}`);
            }}
            data-testid={`button-view-details-${product.id}`}
          >
            View
          </Button>
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <h3
          className="font-serif text-lg font-medium mb-2 cursor-pointer hover:text-primary transition-colors"
          onClick={() => setLocation(`/product/${product.id}`)}
          data-testid={`text-product-name-${product.id}`}
        >
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold" data-testid={`text-price-${product.id}`}>
            £{product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              £{product.originalPrice.toFixed(2)}
            </span>
          )}
          {product.isOutOfStock && (
            <span className="text-sm text-red-600 font-medium">
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
