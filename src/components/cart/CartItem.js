const CartItem = (props) => {
  const price = `₹${props.price.toFixed(2)}`;

  return (
    <li className="flex justify-between items-center border-b-2 border-primary py-4 my-4">
      <div>
        <h2 className="m-0 mb-2 text-foreground text-xs">{props.name}</h2>
        <div className="w-40 flex justify-between items-center">
          <span className="font-bold text-primary">{price}</span>
          <span className="font-bold border border-solid border-[#ccc] py-1 px-3 rounded-md text-foreground">x {props.count}</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <button className="font-inherit font-bold text-xs text-primary border border-solid border-primary w-10 text-center rounded-md bg-transparent cursor-pointer ml-4 my-1 hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground" onClick={props.onRemove}>−</button>
        <button className="font-inherit font-bold text-xs text-primary border border-solid border-primary w-10 text-center rounded-md bg-transparent cursor-pointer ml-4 my-1 hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground" onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
