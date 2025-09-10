'use client';
import { Fragment } from 'react';
import Cart from "../cart/Cart";
import { useCartContext } from "../context/cart-context";
import { ThemeToggle } from '../ui/ThemeToggle';
import { Search } from 'lucide-react';

const Header = () => {
  
  const { showCart, setShowCart, setSearchQuery } = useCartContext();

  const hideCartHandler = () => {
    setShowCart(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  return (
    <Fragment>
      {showCart && <Cart hideCart={hideCartHandler} />}
      <header className="fixed top-0 left-0 w-full bg-primary text-primary-foreground flex justify-between items-center px-4 sm:px-8 py-2 shadow-lg z-10">
        <h1 className="text-base sm:text-lg font-bold">eMenu</h1>
        <div className="relative flex-grow max-w-md mx-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search for dishes..."
            onChange={handleSearchChange}
            className="w-full h-9 pl-10 pr-4 rounded-full bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <ThemeToggle />
      </header>
      <div className="h-14"></div> {/* Spacer for fixed header */}
    </Fragment>
  );
};

export default Header;
