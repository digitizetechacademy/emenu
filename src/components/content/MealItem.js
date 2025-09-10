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
        <h3 className="text-base md:text-lg font-bold mb-1">{props.name}</h3>
        {props.description && <p className="text-xs md:text-sm italic text-gray-600">{props.description}</p>}
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
        <p className="text-sm md:text-base font-bold text-orange-600 mb-1">{price}</p>
        <div className="w-28 flex justify-center">
            {selectedCount === 0 ? (
            <button 
                onClick={() => handleCartCount(props.id, 'add')} 
                className="w-full sm:w-auto bg-orange-500 text-white font-bold py-2 px-4 rounded-full hover:bg-orange-600 transition-colors duration-300 text-sm"
            >
                + Add
            </button>
            ) : (
            <div className="flex items-center justify-center space-x-2 w-full sm:w-auto">
                <button
                onClick={() => handleCartCount(props.id, 'remove')}
                className="bg-orange-500 text-white font-bold rounded-full h-8 w-8 flex items-center justify-center text-xl hover:bg-orange-600 transition-colors duration-300"
                >
                -
                </button>
                <span className="text-lg font-bold w-8 text-center">{selectedCount}</span>
                <button
                onClick={() => handleCartCount(props.id, 'add')}
                className="bg-orange-500 text-white font-bold rounded-full h-8 w-8 flex items-center justify-center text-xl hover:bg-orange-600 transition-colors duration-300"
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
