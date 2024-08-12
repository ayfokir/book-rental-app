import React, { useState } from 'react';
import { Box, List, ListItemIcon, ListItemText, Typography, Divider, ListItemButton, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookIcon from '@mui/icons-material/LocalLibrary'; // LocalLibrary is often used for books
import UploadIcon from '@mui/icons-material/Upload'; // For Book Upload
import PeopleIcon from '@mui/icons-material/People'; // For Owners
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import Link from 'next/link';

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  color: string;
  link: string
}
interface SideBarProps {
  isFullHeight: boolean; // Prop for dynamic height
}

const SideBar: React.FC<SideBarProps> = ({ isFullHeight }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const menuItems: MenuItem[] = [
    { text: 'Dashboard', icon: <DashboardIcon />, color: 'rgba(255, 255, 255, 0.8)', link: "/dashboard" },
    { text: 'Books', icon: <BookIcon />, color: 'rgba(255, 255, 255, 0.8)', link: "/books" },
    { text: 'Book Upload', icon: <UploadIcon />, color: 'rgba(255, 255, 255, 0.8)' , link: "/upload"},
    { text: 'Owners', icon: <PeopleIcon />, color: 'rgba(255, 255, 255, 0.8)', link: "/owners" },
    { text: 'Renters', icon: <PeopleIcon />, color: 'rgba(255, 255, 255, 0.8)', link: "/upload" },
    { text: 'Notification', icon: <NotificationsIcon />, color: 'rgba(255, 255, 255, 0.8)' , link: "/upload"},
    { text: 'Settings', icon: <SettingsIcon />, color: 'rgba(255, 255, 255, 0.8)' , link: "/settings"},
    // { text: 'Logout', icon: <ExitToAppIcon />, color: 'rgba(255, 255, 255, 0.8)' },
  ];
  
  const logout = () => {
    // Remove the token from local storage
    localStorage.removeItem('customer');
    // Optionally, redirect the user to the login page or home page
    window.location.href = '/login'; // or '/home' or any other route
  };

  return (
    <Box
      sx={{
     // Adjust width as needed
        backgroundColor: 'rgb(23,27,54)', // Set the background color
        height: isFullHeight ? '125vh' : '100vh', // Use state to determine height
        display: 'flex',
        flexDirection: 'column',
        margin: '24px', // Add margin for spacing around the parent component
        marginRight: 0,
        borderRadius: "10px",
        padding: "24px"
      }}
    >
      <Box display="flex" alignItems="center" gap={2} p={2}>
        <MenuIcon sx={{ fontSize: '22px', color: 'white' }} />
        <Image
          src='/logo/book.png'
          width={40}
          height={20}
          alt='Logo'
        />
        <Typography variant="h6" component="h6" sx={{ color: 'rgb(9,117,179)' }}>
          Book Rent
        </Typography>
      </Box>

      <Divider sx={{ my: 2, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} /> {/* Styling for Divider */}

      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item, index) => (
          <Link href= {`${item.link}`}>
          <ListItemButton
            key={item.text}
            onClick={() => setSelectedIndex(index)}
            sx={{
              borderRadius: "6px",
              backgroundColor: selectedIndex === index ? 'rgb(0,171,255)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(0,171,255,0.2)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{ style: { color: item.color } }}
            />
          </ListItemButton>
          </Link>
        ))}
      </List>
      <Button sx={{backgroundColor: "rgb(69,73,94)", color: "white"}}  onClick={logout}>Logout</Button>
    </Box>
  );
};

export default SideBar;
