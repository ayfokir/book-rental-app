import React, { useState } from 'react';
import { Box, Button, IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import CardGiftcard from '@mui/icons-material/CardGiftcard';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import Login from '../login/Login'; // Import the Login component

const IconsAndSignIn = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Button sx={{ fontSize: '10px' }} onClick={handleClickOpen}>
        Sign in
      </Button>
      <IconButton sx={{ mx: 1 }}>
        <FavoriteBorder />
      </IconButton>
      <IconButton sx={{ mx: 1 }}>
        <CardGiftcard />
      </IconButton>
      <IconButton sx={{ mx: 1 }}>
        <ShoppingCartOutlined />
      </IconButton>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sign in</DialogTitle>
        <DialogContent>
          <Login />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default IconsAndSignIn;
