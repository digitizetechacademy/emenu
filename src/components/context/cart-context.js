'use client';
import { createContext, useContext, useEffect, useState } from 'react';

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {

  const [allMenuItems, setAllMenuItems] = useState([]);
  const [allMenuItemsById, setAllMenuItemsById] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentHotel, setCurrentHotel] = useState('');

  const addItemToCart = (itemId) => {
    if (cartItems.hasOwnProperty(itemId) && cartItems[itemId] < 8) {
      const tempCart = { ...cartItems };
      tempCart[itemId] += 1;
      setCartItems(tempCart);
    } else {
      const tempCart = { ...cartItems };
      tempCart[itemId] = 1;
      setCartItems(tempCart);
    }
  };

  const removeItemFromCart = (itemId) => {
    if (cartItems.hasOwnProperty(itemId) && cartItems[itemId] > 0) {
      const tempCart = { ...cartItems };
      tempCart[itemId] -= 1;
      if(tempCart[itemId] === 0) {
        delete tempCart[itemId];
      }
      setCartItems(tempCart);
    }
  };

  useEffect(() => {
    let tempTotalAmount = 0;
    Object.keys(cartItems).forEach(cartItemKey => {
      const itemCountInCart = cartItems[cartItemKey];
      for (let i = 0; i < allMenuItems.length; i++) {
        const thisItem = allMenuItems[i];
        if (thisItem.id === cartItemKey) {
          tempTotalAmount += itemCountInCart * thisItem.price;
        }
      }
    });
    setTotalAmount(tempTotalAmount);
  }, [cartItems, allMenuItems]);

  useEffect(() => {
    let allItemsByIdTemp = {};
    for (let i = 0; i < allMenuItems.length; i++) {
      allItemsByIdTemp[allMenuItems[i].id] = allMenuItems[i];
    }
    setAllMenuItemsById(allItemsByIdTemp);
  }, [allMenuItems]);

  const cartItemsAllDetails = () => {
    let tempCompleItemsForCart = [];
    const cartItemsList = Object.keys(cartItems);
    for (let i = 0; i < cartItemsList.length; i++) {
      let fullObj = allMenuItemsById[cartItemsList[i]];
      if(fullObj) {
        fullObj['count'] = cartItems[cartItemsList[i]];
        tempCompleItemsForCart.push(fullObj);
      }
    }
    return tempCompleItemsForCart;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        showCart,
        setShowCart,
        allMenuItems,
        setAllMenuItems,
        addItemToCart,
        removeItemFromCart,
        totalAmount,
        setTotalAmount,
        cartItemsAllDetails,
        currentHotel,
        setCurrentHotel
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
