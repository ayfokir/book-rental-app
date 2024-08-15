'use client'

import React, { useEffect, useState } from 'react';
import {  Toolbar, Button, Box, Container, Divider, Typography, useMediaQuery } from '@mui/material';
import SearchBar from './SearchBar';
import IconsAndSignIn from './IconsAndSignIn';
import MenuIcon from '@mui/icons-material/Menu';
import CategoryPopover from './Category';
import { useTheme } from '@mui/material/styles';

// Inside your component

const Header: React.FC = () => {
const theme = useTheme();

const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
const [open, setOpen] = useState(false);

const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  setAnchorEl(event.currentTarget);
  setOpen(true);
};

const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen size is less than 600px
const isMediumScreen = useMediaQuery(theme.breakpoints.down('md')); // Check if screen size is less than 600px

  return (
      <Box>
        <Box sx={{ px: isSmallScreen ? 0 : 2 }}>
          <Container maxWidth="xl" sx={{ px: isSmallScreen ? 0 : 2 }}>
            <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>{isSmallScreen ? "2F" : "2F Capital"}</Typography>
            {!isMediumScreen &&   <Button sx={{ marginLeft: '10px', fontSize: '12px', display: 'flex', alignItems: 'center', color: "black" }} onClick={handleClick}>
          <MenuIcon sx={{ marginRight: '1px', fontSize: '12px' }} />
          Categories
        </Button>}
            </Box>
          <SearchBar />
          <IconsAndSignIn />
          </Toolbar>
          </Container>
        
          {!isMediumScreen &&  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
            <Button>Gift Mode</Button>
            <Button>Back-to-School Savings</Button>
            <Button>Home Favorites</Button>
            <Button>Fashion Finds</Button>
            <Button>Registry</Button>
          </Box>}
         
          {/* <CategoryPopover anchorEl={anchorEl} open={open}/>      */}
          </Box>
        { !isMediumScreen &&  <Divider sx={{
            pt: 1,
            width: "100%",
            borderBottomWidth: 2, // Adjust thickness (default is 1px)
            // borderBottomColor: 'primary.main', // Change color if needed (e.g., 'black' or theme color)
            borderBottomStyle: 'solid' // Ensure the style is solid
            }} />}
      </Box>
  );  
};

export default Header;

