'use client';
import { useState, useEffect } from "react";

import { useCartContext } from "../context/cart-context";
import { FaCaretRight } from "react-icons/fa";

import CartIcon from "../cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const { cartItems, setShowCart } = useCartContext();
  const [totalCartItems, setTotalCartItems] = useState(0);
  
  const clickHandler = () => {
    setShowCart(true)
  };

  // Cart Button Animation
  const botmNav = `${classes.botmNav}`;
  useEffect(() => {
    if (Object.keys(cartItems).length === 0) {
      setTotalCartItems(0);
      return;
    }
    setTotalCartItems(Object.values(cartItems).reduce((pre, cur) => pre + cur, 0));
  }, [cartItems]);

  return (
    <>
      <div className={botmNav}>
        <div onClick={clickHandler} className="row w-100 p-0">
          <div className="col-9 m-auto p-0">
            <button className={classes.buttonRight}>
              <span className={classes.icon}>
                <CartIcon />
              </span>
              <span className={classes.cart}>Items</span>
              <span className={classes.badge}>{totalCartItems}</span>
            </button>
          </div>
          <div className="col-3 m-auto text-end p-0">
            <button className={classes.buttonLeft}>
              <span>Order </span>
              <span><FaCaretRight /></span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderCartButton;
