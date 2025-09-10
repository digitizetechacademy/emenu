'use client';
import { useState, useEffect } from "react";
import { useCartContext } from "../context/cart-context";
import { FaCaretRight } from "react-icons/fa";
import CartIcon from "../cart/CartIcon";

const HeaderCartButton = (props) => {
  const { cartItems, setShowCart } = useCartContext();
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [isBumping, setIsBumping] = useState(false);

  const clickHandler = () => {
    setShowCart(true);
  };

  useEffect(() => {
    const numberOfCartItems = Object.values(cartItems).reduce((curNumber, item) => {
      return curNumber + item;
    }, 0);
    setTotalCartItems(numberOfCartItems);

    if (numberOfCartItems > 0) {
      setIsBumping(true);
      const timer = setTimeout(() => {
        setIsBumping(false);
      }, 300);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [cartItems]);

  const btnClasses = `fixed bottom-0 left-0 w-full bg-gray-800 text-white cursor-pointer flex justify-between items-center p-3 md:p-4 shadow-lg z-20 ${isBumping ? 'animate-bump' : ''}`;

  return (
    <div onClick={clickHandler} className={btnClasses}>
      <div className="flex items-center space-x-3">
        <span className="w-6 h-6">
          <CartIcon />
        </span>
        <span className="text-base md:text-lg font-bold">Your Cart</span>
        <span className="bg-orange-500 text-white text-sm font-bold rounded-full px-3 py-1">
          {totalCartItems}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-base md:text-lg font-bold">Order</span>
        <span>
          <FaCaretRight />
        </span>
      </div>
    </div>
  );
};

export default HeaderCartButton;
