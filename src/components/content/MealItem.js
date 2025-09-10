'use client';
import { useCartContext } from "../context/cart-context";
import Image from "next/image";

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
    <li className="flex justify-between items-center py-4 select-none">
      <div className="flex-grow">
        <h3 className="text-sm md:text-base font-bold mb-1">{props.name}</h3>
        {props.description && <p className="text-xs italic text-muted-foreground">{props.description}</p>}
      </div>
      <div className="flex-shrink-0 flex flex-col items-center ml-4">
        {props?.img && (
          <div className="w-28 h-28 sm:w-40 sm:h-40 relative mb-2">
            <Image 
              className="rounded-lg object-cover" 
              src={props.img} 
              alt={props.alt || 'Meal item'} 
              layout="fill"
            />
          </div>
        )}
        <p className="text-xs md:text-sm font-bold text-primary mb-1">{price}</p>
        <div className="w-28 flex justify-center">
            {selectedCount === 0 ? (
            <button 
                onClick={() => handleCartCount(props.id, 'add')} 
                className="w-full sm:w-auto bg-primary text-primary-foreground font-bold py-2 px-4 rounded-full hover:bg-primary/90 transition-colors duration-300 text-xs"
            >
                + Add
            </button>
            ) : (
            <div className="flex items-center justify-center space-x-2 w-full sm:w-auto">
                <button
                onClick={() => handleCartCount(props.id, 'remove')}
                className="bg-primary text-primary-foreground font-bold rounded-full h-8 w-8 flex items-center justify-center text-lg hover:bg-primary/90 transition-colors duration-300"
                >
                -
                </button>
                <span className="text-base font-bold w-8 text-center">{selectedCount}</span>
                <button
                onClick={() => handleCartCount(props.id, 'add')}
                className="bg-primary text-primary-foreground font-bold rounded-full h-8 w-8 flex items-center justify-center text-lg hover:bg-primary/90 transition-colors duration-300"
                >
                +
                </button>
            </div>
            )}
        </div>
      </div>
    </li>
  );
};

export default MealItem;
