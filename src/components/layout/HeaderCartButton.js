'use client';
import { useState, useEffect } from "react";
import { useCartContext } from "../context/cart-context";
import { ChevronRight } from "lucide-react";
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

  const btnClasses = `fixed bottom-0 left-0 w-full bg-secondary text-secondary-foreground cursor-pointer flex justify-between items-center p-3 md:p-4 shadow-lg z-20 ${isBumping ? 'animate-bump' : ''}`;

  return (
    <div onClick={clickHandler} className={btnClasses}>
      <div className="flex items-center space-x-3">
        <span className="w-5 h-5">
          <CartIcon />
        </span>
        <span className="text-xs md:text-sm font-bold">Your Cart</span>
        <span className="bg-primary text-primary-foreground text-xs font-bold rounded-full px-2 py-1">
          {totalCartItems}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-xs md:text-sm font-bold">Order</span>
        <span>
          <ChevronRight size={16} />
        </span>
      </div>
    </div>
  );
};

export default HeaderCartButton;
