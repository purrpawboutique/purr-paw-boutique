import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem } from "@/components/CartDrawer";
import { Product } from "@/components/ProductCard";
import { useToast } from "@/hooks/use-toast";

interface CartContextType {
  cartItems: CartItem[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number, size?: string) => void;
  updateQuantity: (id: string, quantity: number, size?: string) => void;
  removeItem: (id: string, size?: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const { toast } = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error("Error parsing saved cart:", error);
        localStorage.removeItem("cart");
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity = 1, size = "M") => {
    setCartItems((prev) => {
      const itemKey = `${product.id}-${size}`;
      const existing = prev.find((item) => `${item.id}-${item.size}` === itemKey);
      
      if (existing) {
        return prev.map((item) =>
          `${item.id}-${item.size}` === itemKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prev, { ...product, quantity, size }];
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const updateQuantity = (id: string, quantity: number, size = "M") => {
    console.log("updateQuantity called:", { id, quantity, size });
    
    if (quantity === 0) {
      removeItem(id, size);
      return;
    }

    setCartItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity }
          : item
      );
      console.log("Cart items updated:", updated);
      return updated;
    });
  };

  const removeItem = (id: string, size = "M") => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const value: CartContextType = {
    cartItems,
    cartOpen,
    setCartOpen,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalItems,
    getSubtotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}