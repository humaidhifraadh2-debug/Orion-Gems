import { createContext, useContext, useEffect, useState } from "react";
import { getCart, addToCart, removeFromCart } from "../services/cartApi";

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (error) {
      console.error("Cart error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId: number, quantity = 1) => {
    await addToCart(productId, quantity);
    await loadCart();
  };

  const handleRemove = async (key: string) => {
    await removeFromCart(key);
    await loadCart();
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart: handleAddToCart,
        removeFromCart: handleRemove,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
