import { useRef, useState } from 'react';

const isEmpty = value => value.trim() === '';

const Checkout = props => {

  const [formValidity, setFormValidity] = useState({
    name: true,
  });

  const nameInputRef = useRef();
  const instructionsInputRef = useRef();

  const confirmHandler = event => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredInstructions = instructionsInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);

    setFormValidity({
      name: enteredNameIsValid,
    });

    const formIsValid = enteredNameIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      instructions: enteredInstructions
    });
  };

  const nameControlClasses = `mb-2 ${formValidity.name ? '' : 'text-destructive'}`;

  return (
    <form className="my-4 h-auto overflow-auto" onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label className="font-bold mb-1 block text-foreground" htmlFor='name'>Your Name</label>
        <input 
            ref={nameInputRef} 
            type='text' 
            id='name'
            className={`font-inherit border border-solid border-border bg-background text-foreground rounded w-full p-1 ${!formValidity.name ? 'border-destructive bg-red-100' : ''}`}
        />
        {!formValidity.name && <p className="text-destructive text-xs">Please enter a valid name!</p>}
      </div>
      <div className="mb-2">
        <label className="font-bold mb-1 block text-foreground" htmlFor='instructions'>Special Instructions (Optional)</label>
        <textarea 
            ref={instructionsInputRef} 
            id='instructions' 
            rows='2'
            className="font-inherit border border-solid border-border bg-background text-foreground rounded w-full p-1"
        ></textarea>
      </div>
      <div className="flex justify-end gap-4 mt-4">
        <button
          type='button' 
          onClick={props.onCancel}
          className="font-inherit text-xs cursor-pointer bg-transparent border border-solid border-primary py-2 px-8 rounded-full ml-4 text-primary hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground"
        >
          Cancel
        </button>
        <button className="font-inherit text-xs cursor-pointer bg-primary text-primary-foreground border border-solid border-primary py-2 px-8 rounded-full ml-4 hover:bg-primary/90 active:bg-primary/90">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
