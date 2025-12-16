import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  ShoppingBag, 
  Minus, 
  Plus, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Product } from "./ProductCard";

// Extended product interface for detail page
export interface DetailedProduct extends Product {
  images?: string[] | Array<{url: string; alt: string; type: string}>;
  description?: string;
  features?: string[];
  materials?: string[];
  careInstructions?: string[];
  sizes?: Array<{
    name: string;
    measurements: {
      chest: string;
      length: string;
      neck: string;
      sleeve?: string;
    };
    inStock: boolean;
    stockQuantity?: number;
  }>;
  reviews?: Array<{
    id: string;
    customerName: string;
    rating: number;
    comment: string;
    date: string;
    petName?: string;
    petImage?: string;
  }>;
  relatedProducts?: Product[];
}

interface ProductDetailPageProps {
  product: DetailedProduct;
  onAddToCart: (product: Product, quantity: number, size: string) => void;
  onRelatedProductClick?: (product: Product) => void;
}

export default function ProductDetailPage({ 
  product, 
  onAddToCart, 
  onRelatedProductClick 
}: ProductDetailPageProps) {
  const [, setLocation] = useLocation();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]?.name || "M");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSizeOnly, setSelectedSizeOnly] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);


  const images = product.images 
    ? product.images.map(img => typeof img === 'string' ? img : img.url)
    : [product.image];

  // Initialize color and size for harness product
  useEffect(() => {
    if (product.id === "accessories-softwalk-airlight-harness" && product.sizes && product.sizes.length > 0) {
      const firstSize = product.sizes[0].name;
      const [color, size] = firstSize.split(" - ");
      setSelectedColor(color || "");
      setSelectedSizeOnly(size || "");
    }
  }, [product.id, product.sizes]);

  // Keyboard navigation for images
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (images.length <= 1) return;
      
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        prevImage();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length]);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const averageRating = product.reviews?.length 
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
    : 0;

  const selectedSizeInfo = product.sizes?.find(size => size.name === selectedSize);

  // Size/Color to image mapping for different products
  const sizeImageMap: Record<string, Record<string, number>> = {
    "accessories-softwalk-leather-leash": {
      "Sea Salt Lemon": 2, // view2.jpg
      "Orange Forest": 3,  // view3.jpg
      "Moon Cloud White": 4, // view4.jpg
    },
    "accessories-softwalk-airlight-harness": {
      "Moon Cloud White - S": 2, // view2.jpg
      "Moon Cloud White - M": 2, // view2.jpg
      "Moon Cloud White - L": 2, // view2.jpg
      "Orange Forest - M": 3,    // view3.jpg
      "Orange Forest - L": 3,    // view3.jpg
      "Sea Salt Lemon - L": 4,   // view4.jpg
    },
    "ootd-sherlock-heritage-coat": {
      "BD-S": 5, // view5.jpg (index 5: main=0, view1=1, view2=2, view3=3, view4=4, view5=5)
    },
    "knits-poncho-merino-wool-hoodie": {
      "Honey (Bee Yellow) - S": 1, // view2.jpg - color options
      "Honey (Bee Yellow) - M": 1, // view2.jpg - color options
      "Rose (Rosy Pink) - M": 1,   // view2.jpg - color options
      "Olive (Moss Green) - S": 1, // view2.jpg - color options
      "Olive (Moss Green) - M": 1, // view2.jpg - color options
      "Cloud (Sky Blue) - M": 1,   // view2.jpg - color options
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedSize);
  };

  // Handle size/color selection with image switching
  const handleSizeSelect = (sizeName: string) => {
    setSelectedSize(sizeName);
    setQuantity(1); // Reset quantity to 1 when switching colors/sizes
    
    // Check if this product has size-specific image mapping
    const productImageMap = sizeImageMap[product.id];
    if (productImageMap && productImageMap[sizeName] !== undefined) {
      setSelectedImageIndex(productImageMap[sizeName]);
    }
  };

  // Get maximum quantity based on stock
  const getMaxQuantity = () => {
    if (selectedSizeInfo?.stockQuantity !== undefined) {
      return selectedSizeInfo.stockQuantity;
    }
    return 10; // Default max for products without specific stock quantity
  };

  const nextImage = () => {
    const newIndex = (selectedImageIndex + 1) % images.length;
    setSelectedImageIndex(newIndex);
  };

  const prevImage = () => {
    const newIndex = (selectedImageIndex - 1 + images.length) % images.length;
    setSelectedImageIndex(newIndex);
  };

  // Touch handlers for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && images.length > 1) {
      nextImage();
    }
    if (isRightSwipe && images.length > 1) {
      prevImage();
    }
  };



  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          <button 
            onClick={() => setLocation("/")}
            className="hover:text-foreground transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <button 
            onClick={() => setLocation("/shop")}
            className="hover:text-foreground transition-colors"
          >
            Shop
          </button>
          <span>/</span>
          <button 
            onClick={() => setLocation(`/category/${encodeURIComponent(product.category)}`)}
            className="hover:text-foreground transition-colors"
          >
            {product.category}
          </button>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div 
              className="relative aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer select-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover pointer-events-none"
              />
              
              {/* Image Navigation - Main Image Arrows */}
              {images.length > 1 && (
                <>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-xl border border-gray-300 w-14 h-14 rounded-full transition-all duration-200 hover:scale-110 z-20 backdrop-blur-sm"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-7 w-7 text-gray-800" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-xl border border-gray-300 w-14 h-14 rounded-full transition-all duration-200 hover:scale-110 z-20 backdrop-blur-sm"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-7 w-7 text-gray-800" />
                  </Button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
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
                {discount > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    -{discount}%
                  </Badge>
                )}
              </div>

              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {selectedImageIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery - Grid Layout */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                      selectedImageIndex === index 
                        ? "border-primary shadow-md" 
                        : "border-gray-200 hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-wide text-muted-foreground mb-2">
                {product.category}
              </p>
              <h1 className="font-serif text-3xl md:text-4xl font-medium mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              {product.reviews && product.reviews.length > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(averageRating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews.length} {product.reviews.length === 1 ? 'review' : 'reviews'})
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-semibold">
                  £{product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    £{product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.sizes?.every(size => !size.inStock) && (
                  <span className="text-lg text-red-600 font-medium">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {product.description}
                </p>
              )}
            </div>

            {/* Size/Color Selection */}
            {product.sizes && (
              <div className="space-y-3">
                {(product.id === "accessories-softwalk-airlight-harness" || product.id === "knits-poncho-merino-wool-hoodie" || product.id === "knits-christmas-knitwear") ? (
                  // Special layout for harness product with separate color and size
                  <div className="space-y-6">
                    {/* Color/Style Selection */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium">
                        {product.id === "knits-christmas-knitwear" ? "Style" : "Color"}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {Array.from(new Set(product.sizes?.map(size => {
                          // Handle different color/style formats
                          if (product.id === "knits-poncho-merino-wool-hoodie") {
                            // Format: "Honey (Bee Yellow) - M" -> "Honey (Bee Yellow)"
                            return size.name.split(" - ")[0];
                          } else if (product.id === "knits-christmas-knitwear") {
                            // Format: "Snowman - S" -> "Snowman"
                            return size.name.split(" - ")[0];
                          } else {
                            // Format: "Moon Cloud White - M" -> "Moon Cloud White"
                            return size.name.split(" - ")[0];
                          }
                        }) || [])).map((color) => {
                          // Check if this color has any available sizes
                          const availableSizes = (product.sizes || [])
                            .filter(size => size.name.startsWith(color + " - ") && size.inStock);
                          const hasStock = availableSizes.length > 0;
                          
                          const button = (
                            <Button
                              key={color}
                              variant={selectedColor === color ? "default" : "outline"}
                              size="sm"
                              onClick={() => {
                                if (hasStock) {
                                  setSelectedColor(color);
                                  // Find a valid size for this color
                                  const availableSizeNames = availableSizes.map(size => size.name.split(" - ")[1]);
                                  if (availableSizeNames.length > 0) {
                                    const newSize = availableSizeNames.includes(selectedSizeOnly) ? selectedSizeOnly : availableSizeNames[0];
                                    setSelectedSizeOnly(newSize);
                                    handleSizeSelect(color + " - " + newSize);
                                  }
                                }
                              }}
                              disabled={!hasStock}
                              className="min-w-[4rem]"
                            >
                              {color}
                            </Button>
                          );

                          if (!hasStock) {
                            return (
                              <TooltipProvider key={color}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    {button}
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Out of Stock</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            );
                          }

                          return button;
                        })}
                      </div>
                    </div>

                    {/* Size Selection */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium">Size</label>
                      <div className="flex flex-wrap gap-2">
                        {Array.from(new Set((product.sizes || []).map(size => size.name.split(" - ")[1]))).map((size) => {
                          const fullSizeName = selectedColor + " - " + size;
                          const sizeInfo = product.sizes?.find(s => s.name === fullSizeName);
                          const hasStock = sizeInfo && sizeInfo.inStock;
                          
                          const button = (
                            <Button
                              key={size}
                              variant={selectedSizeOnly === size ? "default" : "outline"}
                              size="sm"
                              onClick={() => {
                                if (hasStock) {
                                  setSelectedSizeOnly(size);
                                  handleSizeSelect(selectedColor + " - " + size);
                                }
                              }}
                              disabled={!hasStock}
                              className="min-w-[3rem]"
                            >
                              {size}
                            </Button>
                          );

                          if (!hasStock) {
                            return (
                              <TooltipProvider key={size}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    {button}
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Out of Stock</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            );
                          }

                          return button;
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Standard layout for other products
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Size</label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => {
                        const button = (
                          <Button
                            key={size.name}
                            variant={selectedSize === size.name ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                              if (size.inStock) {
                                handleSizeSelect(size.name);
                              }
                            }}
                            disabled={!size.inStock}
                            className="min-w-[3rem]"
                          >
                            {size.name}
                          </Button>
                        );

                        if (!size.inStock) {
                          return (
                            <TooltipProvider key={size.name}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  {button}
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Out of Stock</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          );
                        }

                        return button;
                      })}
                    </div>
                  </div>
                )}
                {selectedSizeInfo && (
                  <div className="text-xs text-muted-foreground">
                    Chest: {selectedSizeInfo.measurements.chest} | 
                    Length: {selectedSizeInfo.measurements.length} | 
                    Neck: {selectedSizeInfo.measurements.neck}
                    {selectedSizeInfo.measurements.sleeve && ` | Sleeve: ${selectedSizeInfo.measurements.sleeve}`}
                  </div>
                )}
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setQuantity(Math.min(getMaxQuantity(), quantity + 1))}
                  disabled={quantity >= getMaxQuantity()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                {selectedSizeInfo?.stockQuantity !== undefined && selectedSizeInfo.stockQuantity < 5 && (
                  <span className="text-xs text-primary font-medium">
                    Stock available: {selectedSizeInfo.stockQuantity}
                  </span>
                )}
              </div>
            </div>

            {/* Add to Cart & Wishlist */}
            <div className="flex gap-3">
              <Button
                onClick={handleAddToCart}
                className="flex-1"
                size="lg"
                disabled={selectedSizeInfo && !selectedSizeInfo.inStock}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                {selectedSizeInfo && !selectedSizeInfo.inStock ? "Out of Stock" : "Add to Cart"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
              </Button>
            </div>

            {/* Bundle Purchase Option */}
            {(product.id === "accessories-softwalk-leather-leash" || product.id === "accessories-softwalk-airlight-harness") && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-900">
                      🎁 Bundle Deal - Save 5%
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      {product.id === "accessories-softwalk-leather-leash" 
                        ? "Buy with SoftWalk AirLight Harness" 
                        : "Buy with SoftWalk Leather Leash"}
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      Original: £{((product.price + (product.id === "accessories-softwalk-leather-leash" ? 36.99 : 29.99))).toFixed(2)} → 
                      Bundle: £{((product.price + (product.id === "accessories-softwalk-leather-leash" ? 36.99 : 29.99)) * 0.95).toFixed(2)}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setLocation(product.id === "accessories-softwalk-leather-leash" 
                      ? "/product/accessories-softwalk-airlight-harness" 
                      : "/product/accessories-softwalk-leather-leash")}
                    className="text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    Pair Item
                  </Button>
                </div>
              </div>
            )}

            {/* Free Shipping Notice */}
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                ✨ Free shipping on first order or 2+ items
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Free Shipping</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Easy Returns</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Quality Guarantee</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="sizing">Sizing Guide</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-serif text-xl font-medium mb-4">Product Features</h3>
                  {product.features && (
                    <ul className="space-y-2 text-muted-foreground">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-medium mb-4">Materials & Care</h3>
                  {product.materials && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Materials:</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          {product.materials.map((material, index) => (
                            <li key={index}>• {material}</li>
                          ))}
                        </ul>
                      </div>
                      {product.careInstructions && (
                        <div>
                          <h4 className="font-medium mb-2">Care Instructions:</h4>
                          <ul className="space-y-1 text-muted-foreground">
                            {product.careInstructions.map((instruction, index) => (
                              <li key={index}>• {instruction}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="sizing" className="mt-8">
              <div className="max-w-2xl">
                <h3 className="font-serif text-xl font-medium mb-4">Size Guide</h3>
                <p className="text-muted-foreground mb-6">
                  Measure your pet while they're standing naturally. For the best fit, 
                  add 1-2 inches to each measurement.
                </p>
                {product.sizes && (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-border">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border border-border p-3 text-left">Size</th>
                          <th className="border border-border p-3 text-left">Chest</th>
                          <th className="border border-border p-3 text-left">Length</th>
                          <th className="border border-border p-3 text-left">Neck</th>
                          {product.sizes?.some(size => size.measurements.sleeve) && (
                            <th className="border border-border p-3 text-left">Sleeve</th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {product.sizes.map((size) => (
                          <tr key={size.name}>
                            <td className="border border-border p-3 font-medium">{size.name}</td>
                            <td className="border border-border p-3">{size.measurements.chest}</td>
                            <td className="border border-border p-3">{size.measurements.length}</td>
                            <td className="border border-border p-3">{size.measurements.neck}</td>
                            {product.sizes?.some(size => size.measurements.sleeve) && (
                              <td className="border border-border p-3">{size.measurements.sleeve || '-'}</td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-medium">Customer Reviews</h3>
                  {product.reviews && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(averageRating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {averageRating.toFixed(1)} out of 5 ({product.reviews.length} {product.reviews.length === 1 ? 'review' : 'reviews'})
                      </span>
                    </div>
                  )}
                </div>
                
                {product.reviews && product.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {product.reviews.map((review) => (
                      <Card key={review.id} className="p-6">
                        <div className="flex items-start gap-4">
                          {review.petImage && (
                            <img
                              src={review.petImage}
                              alt={review.petName}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium">{review.customerName}</h4>
                              {review.petName && (
                                <span className="text-sm text-muted-foreground">
                                  with {review.petName}
                                </span>
                              )}
                              <div className="flex items-center ml-auto">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-muted-foreground mb-2">{review.comment}</p>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No reviews yet. Be the first to review this product!
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* You May Also Like */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="font-serif text-2xl font-medium mb-2">
                You May Also Like
              </h2>
              <p className="text-muted-foreground">
                Curated recommendations based on this product
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {product.relatedProducts.map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  className="group cursor-pointer overflow-hidden border hover:shadow-lg transition-all duration-300"
                  onClick={() => onRelatedProductClick?.(relatedProduct)}
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {relatedProduct.isNew && (
                      <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
                        New
                      </Badge>
                    )}
                    {relatedProduct.isBestseller && (
                      <Badge className="absolute top-2 right-2 bg-orange-500 hover:bg-orange-600">
                        Bestseller
                      </Badge>
                    )}
                    {relatedProduct.originalPrice && relatedProduct.originalPrice > relatedProduct.price && (
                      <Badge variant="destructive" className="absolute bottom-2 left-2">
                        Sale
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      {relatedProduct.category}
                    </p>
                    <h3 className="font-serif font-medium mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">£{relatedProduct.price.toFixed(2)}</p>
                      {relatedProduct.originalPrice && relatedProduct.originalPrice > relatedProduct.price && (
                        <p className="text-sm text-muted-foreground line-through">
                          £{relatedProduct.originalPrice.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}