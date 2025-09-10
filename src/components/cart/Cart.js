'use client';
import React, { useEffect, useState } from "react";
import { useCartContext } from "../context/cart-context";
import Modal from "../interface/Modal";
import CartItem from "./CartItem";
import { useSearchParams } from "next/navigation";
import classes from "./Cart.module.css";
import config from "../../data/config.json";

const Cart = (props) => {
  const {
    cartItems,
    totalAmount,
    addItemToCart,
    removeItemFromCart,
    cartItemsAllDetails,
    currentHotel,
  } = useCartContext();
  const [tableNumber, setTableNumber] = useState(-1);
  const searchParams = useSearchParams();
  const [currentHotelConfig, setCurrentHotelConfig] = useState({});

  const hasItems = Object.keys(cartItems).some(
    (itemId) => cartItems[itemId] > 0
  );

  const handleCartCount = (itemId, action = "add") => {
    if (action === "add") {
      if (cartItems[itemId] < 8) {
        addItemToCart(itemId);
      }
    } else if (action === "remove") {
      if (cartItems[itemId] !== 0) {
        removeItemFromCart(itemId);
      }
      if (cartItems[itemId] === 0) {
        delete cartItems[itemId];
      }
    } else {
      return null;
    }
  };

  useEffect(() => {
    const onTable = searchParams.get("table");
    const onCustomTableName = searchParams.get("custom_table_name");
    if (onTable) {
      setTableNumber(onTable);
    } else if (onCustomTableName) {
      setTableNumber(onCustomTableName);
    }
  }, [searchParams]);

  useEffect(() => {
    if(currentHotel) {
        setCurrentHotelConfig(config[currentHotel]);
    }
  }, [currentHotel]);

  const handleOrder = () => {
    let tableDetail = "";
    if (tableNumber > 0) {
      tableDetail = `on Table: ${tableNumber}`;
    } else if (searchParams.get("custom_table_name")) {
      tableDetail = `on Table: ${searchParams.get("custom_table_name")}`;
    }
    let orderWhatsAppMessage = `https://api.whatsapp.com/send/?phone=+91${currentHotelConfig.whatsapp}&text=New Order ${tableDetail}%0a%0a`;
    cartItemsAllDetails()
      .filter((item) => item.count > 0)
      .forEach((item) => {
        orderWhatsAppMessage += `${item.name}%0a₹${item.price} X ${
          item.count
        } = ₹${item.price * item.count}%0a%0a`;
      });
    orderWhatsAppMessage += `Total order value : ₹${totalAmount}%0a%0aHope you're having a great dining at ${currentHotelConfig.name}, Thanks.`;
    window.open(orderWhatsAppMessage, "_blank");
  };

  const cartItemsRendered = cartItemsAllDetails()
    .filter((item) => item.count > 0)
    .map((item) => (
      <CartItem
        key={item?.id}
        name={item?.name}
        count={item?.count}
        price={item?.price ? item?.price : 0}
        onAdd={handleCartCount.bind(null, item?.id, "add")}
        onRemove={handleCartCount.bind(null, item?.id, "remove")}
      />
    ));

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.hideCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={handleOrder}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      <ul className={classes["cart-items"]}>{cartItemsRendered}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>₹{totalAmount}</span>
      </div>
      {modalActions}
    </React.Fragment>
  );

  return <Modal onClick={props.hideCart}>{cartModalContent}</Modal>;
};

export default Cart;
