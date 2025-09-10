import { Fragment } from 'react';
import Cart from "../cart/Cart";
import classes from "./Header.module.css";
import { useCartContext } from "../context/cart-context";

const Header = () => {
  
  const { showCart, setShowCart } = useCartContext();

  const hideCartHandler = () => {
    setShowCart(false);
  };
  
  return (
    <Fragment>
      {showCart && <Cart hideCart={hideCartHandler} />}
      <header className={classes.header}>
        <h1>Digi Menu</h1>
      </header>
      <div className={classes['main-image']}>
      </div>
    </Fragment>
  );
};

export default Header;