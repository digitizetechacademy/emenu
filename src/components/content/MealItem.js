import { useCartContext } from "../context/cart-context";
import classes from "./MealItem.module.css";

const MealItem = (props) => {
  const { cartItems, addItemToCart, removeItemFromCart } = useCartContext();
  const selectedCount = cartItems[props.id] || 0;

  const price = `₹${props.price.toFixed(2)}`;

  const handleCartCount = (itemId, action = 'add') => {
    if (action === 'add') {
      if (selectedCount < 8) {
        addItemToCart(itemId);
      }
    } else if (action === 'remove') {
      if (selectedCount !== 0) {
        removeItemFromCart(itemId);
      }
    } else {
      return null;
    }
  };

  return (
    <>
      <li className={classes.meal}>
        <div className="row m-auto">
          <div className="col-7 m-auto">
            <h3>{props.name}</h3>
            {props.description ? <div className={classes.description}>{props.description}</div> : null}
            <div className={classes.price}>{price}</div>
          </div>
          <div className="col-5 m-auto text-center">
            {props?.img ? <img className={classes.img} src={props.img} alt={props.alt} /> : null}
            {selectedCount === 0 ? (
              <span style={{ marginTop: "-2vh" }}>
                <button onClick={() => handleCartCount(props.id, 'add')} className={classes.addBtn}>
                  + Add
                </button>
              </span>
            ) : (
              <span className="d-flex " style={{ justifyContent: "center" }}>
                <button
                  style={{ paddingRight: "10px", paddingLeft: "10px" }}
                  onClick={() => handleCartCount(props.id, 'remove')}
                  className={classes.btn}
                >
                  -
                </button>
                <div
                  style={{
                    paddingRight: "5px",
                    paddingLeft: "5px",
                    fontSize: "1.3em",
                    margin: "-2vh 10px 0px 10px",
                    borderRadius: "50%",
                    width: "30px",
                    maxWidth: "30px",
                    minWidth: "30px",
                    backgroundColor: "white",
                  }}
                >
                  {selectedCount}
                </div>
                <button
                  style={{ paddingRight: "10px", paddingLeft: "10px" }}
                  onClick={() => handleCartCount(props.id, 'add')}
                  className={classes.btn}
                >
                  +
                </button>
              </span>
            )}
          </div>
        </div>
      </li>
    </>
  );
};

export default MealItem;
