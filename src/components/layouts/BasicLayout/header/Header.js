'use client';
import Cart from "../../../cart/Cart";
import "../css/Header.css";
import { useCartContext } from "../../../context/cart-context";
import { useParams } from "next/navigation";
import TypeSelecter from "../../TypeSelecter";

const formatName = (name) => {
  if (typeof name !== 'string') return '';
  return name
    .replace(/-/g, " ") 
    .split(" ") 
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) 
    .join(" "); 
};

const Header = () => {
  const params = useParams();
  const hotelInUrl = params.hotel;
  const formattedHotelName = formatName(hotelInUrl); 

  const { showCart, setShowCart } = useCartContext();
  const hideCartHandler = () => {
    setShowCart(false);
  };

  return (
    <>
      {showCart && <Cart hideCart={hideCartHandler} />}
      <header className="header navbar-area">
        <div className="header-middle">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-between">
                <div className="col-lg-6 col-md-6 col-sm-8 d-flex justify-content-lg-start justify-content-md-start justify-content-sm-start">
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
