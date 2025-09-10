import Cart from "../../../cart/Cart";
import "../css/Header.css";
import { useCartContext } from "../../../context/cart-context";
// import configData from '../../../../data/config.json';
import { useParams } from "react-router-dom";
import TypeSelecter from "../../TypeSelecter";

const formatName = (name) => {
  return name
    .replace(/-/g, " ") // Replace hyphens with spaces
    .split(" ") // Split the string into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(" "); // Join the words back into a single string
};

const Header = () => {
  const params = useParams();
  const hotelInUrl = params.hotel;
  const formattedHotelName = formatName(hotelInUrl); // Format the hotel name
  // const currentData = configData[hotelInUrl];

  const { showCart, setShowCart } = useCartContext();
  const hideCartHandler = () => {
    setShowCart(false);
  };

  return (
    <>
      {/* <Fragment>
        {showCart && <Cart hideCart={hideCartHandler} />}
        <header className={classes.header}>
          <h3>Digi Menu</h3>
          {currentData.destination && <ChooseDestination />}
        </header>
        <div className={classes['main-image']}>
        </div>
      </Fragment> */}

      {showCart && <Cart hideCart={hideCartHandler} />}
      <header className="header navbar-area">
        <div className="header-middle">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-4 col-md-12 col-sm-12 d-flex justify-content-lg-start justify-content-center">
                <div className="navbar-brand">
                  <img
                    src="/assets/images/logo/apnichanderi_logo.png"
                    alt="Logo"
                  />
                </div>
              </div>
              <div className="col-lg-8 col-md-12 col-sm-12 d-flex justify-content-between">
                <div className="col-lg-6 col-md-6 col-sm-8 d-flex justify-content-lg-center justify-content-md-start justify-content-sm-start">
                  <div className="main-menu-search">
                    <nav className="navbar navbar-expand-lg">
                      <h1 className="m-0 text-capitalize custom-font">
                        {formattedHotelName}
                      </h1>
                    </nav>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-3 d-flex justify-content-end align-items-center">
                  <div className="middle-right-area">
                    <div className="navbar-cart">
                      <TypeSelecter />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
