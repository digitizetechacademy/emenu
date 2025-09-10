import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

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

  const nameControlClasses = `${classes.control} ${formValidity.name ? '' : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameInputRef} type='text' id='name' />
        {!formValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='instructions'>Special Instructions (Optional)</label>
        <textarea ref={instructionsInputRef} id='instructions' rows='2'></textarea>
      </div>
      <div className={classes.actions}>
        <button
          type='button' onClick={props.onCancel}>
          Cancel</button>
        <button className={classes.submit}>
          Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
