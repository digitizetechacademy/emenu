import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: '#ffffff',
        color: '#000000',
        textAlign: 'center',
        padding: '1px 0',
        zIndex: 1000,
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
        borderTop: '1px solid #e0e0e0',  // Adds the top border
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Manrope, sans-serif',  // Sets the font
        fontSize: '10px',  // Sets the font size
      }}
    >
      <Typography variant="body2">
        Developed in Chanderi with ❤️ by{' '}
        <Link 
          href="https://apnichanderi.in/about" 
          target="_blank" 
          rel="noopener noreferrer" 
          sx={{ color: 'rgb(253, 99, 27)', textDecoration: 'none' }}
        >
          Team Apni Chanderi
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
