import React from 'react';
import { Box, Button, IconButton } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import CardGiftcard from '@mui/icons-material/CardGiftcard';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';

const IconsAndSignIn = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Button sx={{ fontSize: "10px" }}>Sign in</Button>
      <IconButton sx={{ mx: 1 }}>
        <FavoriteBorder />
      </IconButton>
      <IconButton sx={{ mx: 1 }}>
        <CardGiftcard />
      </IconButton>
      <IconButton sx={{ mx: 1 }}>
        <ShoppingCartOutlined />
      </IconButton>
    </Box>
  );
};

export default IconsAndSignIn;



