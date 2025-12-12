import { useState } from "react";
import CartDrawer, { CartItem } from "../CartDrawer";
import { Button } from "@/components/ui/button";
import img1 from "@assets/IMG_3081_1765554779089.jpg";
import img2 from "@assets/IMG_3088_1765554785091.jpg";

export default function CartDrawerExample() {
  const [isOpen, setIsOpen] = useState(true);
  const [items, setItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Holiday Christmas Cape",
      price: 59.99,
      image: img1,
      category: "Holiday Collection",
      quantity: 1,
      size: "Medium",
    },
    {
      id: "2",
      name: "Festive Collar Set",
      price: 45.99,
      image: img2,
      category: "Accessories",
      quantity: 2,
      size: "Small",
    },
  ]);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setItems(items.filter((item) => item.id !== id));
    } else {
      setItems(items.map((item) => (item.id === id ? { ...item, quantity } : item)));
    }
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Cart</Button>
      <CartDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={items}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => console.log("Checkout clicked")}
      />
    </>
  );
}
