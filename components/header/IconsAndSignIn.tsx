import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, Dialog, DialogTitle, DialogContent, useMediaQuery } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import CardGiftcard from '@mui/icons-material/CardGiftcard';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import { useTheme } from '@mui/material/styles';


const IconsAndSignIn = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen size is less than 600px
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md')); // Check if screen size is less than 600px

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
    {!isMediumScreen && (
      <Button sx={{ fontSize: '10px' }}>
        Sign in
      </Button>
    )}
    <IconButton sx={{ mx: isMediumScreen ? 0 : 1 }}>
      <FavoriteBorder />
    </IconButton>
    <IconButton sx={{ mx: isMediumScreen ? 0 : 1 }}>
      <CardGiftcard />
    </IconButton>
    <IconButton sx={{ mx: isMediumScreen ? 0 : 1 }}>
      <ShoppingCartOutlined />
    </IconButton>
  </Box>
  );
};

export default IconsAndSignIn;
