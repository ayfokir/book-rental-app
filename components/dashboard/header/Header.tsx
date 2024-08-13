import React, { useEffect } from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { useAuth } from '@/context/AuthContext';

const Header: React.FC = () => {
const {role}  = useAuth()
  return (
    <Box sx={{backgroundColor: "white", borderRadius: "10px"}}>
   <Toolbar>
  <Typography variant="h6">
    <strong>{role ? role.charAt(0).toUpperCase() + role.slice(1) : ""}</strong>/Dashboard
  </Typography>
</Toolbar>

    </Box>
  );
};

export default Header;
