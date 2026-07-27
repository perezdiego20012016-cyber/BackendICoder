import { createContext, useContext, useState } from "react";

const CartContext = createContext();

// El hook comparte archivo con el provider para conservar la API pública original.
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (item, quantity) => {
    if (!item) return;

    const exist = cart.find(prod => prod.id === item.id);

    if (exist) {
      setCart(cart.map(prod =>
        prod.id === item.id
          ? { ...prod, quantity: prod.quantity + quantity }
          : prod
      ));
    } else {
      setCart([...cart, { ...item, quantity }]);
    }
  };

  const removeItem = (id) => {
    setCart(cart.filter(prod => prod.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalQuantity = () => {
    return cart.reduce((acc, prod) => acc + prod.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((acc, prod) => acc + prod.Price * prod.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addItem,
      getTotalQuantity,
      getTotalPrice,
      removeItem,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
