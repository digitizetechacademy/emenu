import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import './Buttons.css';

const ChooseDestination = () => {
  const [selectedOption, setSelectedOption] = useState(sessionStorage.getItem('diningOption') || 'dine-in');

  useEffect(() => {
    sessionStorage.setItem('diningOption', selectedOption);
  }, [selectedOption]);

  return (
    <ButtonGroup sx={{ my: 1 }}>
      <Button
        className="custom-button"
        variant={selectedOption === 'dine-in' ? 'contained' : 'outlined'}
        onClick={() => setSelectedOption('dine-in')}
        sx={{
          backgroundColor: selectedOption === 'dine-in' ? 'blanchedalmond' : 'transparent',
          color: selectedOption === 'dine-in' ? 'black' : 'inherit',
          '&:hover': {
            backgroundColor: 'blanchedalmond',
            color: 'black',
          }
        }}
      >
        Dine-In
      </Button>
      <Button
        className="custom-button"
        variant={selectedOption === 'delivery' ? 'contained' : 'outlined'}
        onClick={() => setSelectedOption('delivery')}
        sx={{
          backgroundColor: selectedOption === 'delivery' ? 'blanchedalmond' : 'transparent',
          color: selectedOption === 'delivery' ? 'black' : 'inherit',
          '&:hover': {
            backgroundColor: 'blanchedalmond',
            color: 'black',
          }
        }}
      >
        Delivery
      </Button>
    </ButtonGroup>
  );
}

export default ChooseDestination;
