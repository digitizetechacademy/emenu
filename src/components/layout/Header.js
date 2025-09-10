'use client';
import { Fragment } from 'react';
import Cart from "../cart/Cart";
import { useCartContext } from "../context/cart-context";
import { ThemeToggle } from '../ui/ThemeToggle';

const Header = () => {
  
  const { showCart, setShowCart } = useCartContext();

  const hideCartHandler = () => {
    setShowCart(false);
  };
  
  return (
    <Fragment>
      {showCart && <Cart hideCart={hideCartHandler} />}
      <header className="fixed top-0 left-0 w-full bg-primary text-primary-foreground flex justify-between items-center px-4 sm:px-8 py-2 shadow-lg z-10">
        <h1 className="text-base sm:text-lg font-bold">eMenu</h1>
        <ThemeToggle />
      </header>
      <div className="h-14"></div> {/* Spacer for fixed header */}
    </Fragment>
  );
};

export default Header;
