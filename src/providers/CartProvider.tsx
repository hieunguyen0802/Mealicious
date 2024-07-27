import { createContext, useContext, PropsWithChildren, useState } from "react";
import { CartItem, Product } from "../types";
import { randomUUID } from "expo-crypto";

type CartType = {
  items: CartItem[];
  onAddItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
};

export const CardContext = createContext<CartType>({
  items: [],
  onAddItem: () => {},
  updateQuantity: () => {},
  total: 0,
});

const CardProvider = ({ children }: PropsWithChildren) => {

    
    const [items, setItems] = useState<CartItem[]>([]);
    
    const total = items.reduce((sum,item) => (sum += item.product.price * item.quantity),0)

    // add new item
    const onAddItem = (product: Product, size: CartItem["size"]) => {
    //check exist item in card, increment quantity

    const existItem = items.find(
      (item) => item.product === product && item.size === size
    );

    if (existItem) {
      updateQuantity(existItem.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      id: randomUUID(),
      product_id: product.id,
      product,
      size,
      quantity: 1,
    };

    setItems([newCartItem, ...items]);
  };

  // update item
const updateQuantity = (itemId: string, amount: -1 | 1) => {
    const updatedData = items.map((x) =>
      x.id !== itemId ? x : { ...x, quantity: x.quantity + amount }
    );
    setItems(updatedData.filter((item) => item.quantity > 0));
  };

  return (
    <CardContext.Provider value={{ items, onAddItem, updateQuantity, total }}>
      {children}
    </CardContext.Provider>
  );
};

export default CardProvider;

export const useCart = () => useContext(CardContext);
