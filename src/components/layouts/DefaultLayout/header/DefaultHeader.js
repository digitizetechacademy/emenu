import { Fragment } from 'react';
import Cart from "../../../cart/Cart";
import classes from "../css/Header.module.css";
import { useCartContext } from "../../../context/cart-context";
import ChooseDestination from '../../../destination/ChooseDestination';
import configData from '../../../../data/config.json';
import { useParams } from 'react-router-dom';

const DefaultHeader = () => {
  const params = useParams();
  const hotelInUrl = params.hotel;
  const currentData = configData[hotelInUrl];

  const { showCart, setShowCart } = useCartContext();
  const hideCartHandler = () => {
    setShowCart(false);
  };

  return (
    <Fragment>
      {showCart && <Cart hideCart={hideCartHandler} />}
      <header className={classes.header}>
        <h3>Digi Menu</h3>
        {currentData.destination && <ChooseDestination />}
      </header>
      <div className={classes['main-image']}>
      </div>
    </Fragment>
  );
};

export default DefaultHeader;
