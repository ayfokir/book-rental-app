'use client'

import React, { useEffect, useState } from 'react';
import {  Toolbar, Button, Box, Container, Divider } from '@mui/material';
import SearchBar from './SearchBar';
import IconsAndSignIn from './IconsAndSignIn';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import CategoryPopover from './Category';

// Inside your component

const Header: React.FC = () => {
const [windowWidth, setWindowWidth] = useState(0);

const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
const [open, setOpen] = useState(false);

const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  setAnchorEl(event.currentTarget);
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
  setAnchorEl(null);
};

  useEffect(() => {
    // Function to update state with the current window width
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Initial setting of window width
    handleResize();
    
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isLargeScreen = windowWidth >= 900;
  return (
    isLargeScreen ? (
      <Box>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Image 
        src="/logo/2F-logo-02.svg" 
        alt="2F Capital" 
        width={100}
        height={60} 
      />
      <Button sx={{ marginLeft: '10px', fontSize: '12px', display: 'flex', alignItems: 'center', color: "black" }} onClick={handleClick}>
        <MenuIcon sx={{ marginRight: '3px', fontSize: '22px' }} />
        Categories
      </Button>
    </Box>            
              <SearchBar />
            <IconsAndSignIn />
          </Toolbar>
        </Container>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
          <Button>Gift Mode</Button>
          <Button>Back-to-School Savings</Button>
          <Button>Home Favorites</Button>
          <Button>Fashion Finds</Button>
          <Button>Registry</Button>
        </Box>
        <Divider sx={{
          pt: 1,
          borderBottomWidth: 2, // Adjust thickness (default is 1px)
          // borderBottomColor: 'primary.main', // Change color if needed (e.g., 'black' or theme color)
          borderBottomStyle: 'solid' // Ensure the style is solid
          }} />
        <CategoryPopover anchorEl={anchorEl} open={open} onClose={handleClose} />     
      
        </Box>
    ) : (
      
      <Container>
        <Box sx={{display: "flex", justifyContent: "space-between", flexWrap: "wrap"}}>
        <Image
          src="/logo/2F-logo-02.svg"
          alt="2F Capital"
          width={80}
          height={60}
        />
        < IconsAndSignIn   />
        </Box>

        <Box sx={{display: "flex", alignItems:  "center"}}>
        <MenuIcon sx={{  fontSize: '22px' }} />
        <SearchBar   />
        </Box>
        <CategoryPopover anchorEl={anchorEl} open={open} onClose={handleClose} />
        </Container>
        
    )
  );  
};

export default Header;

