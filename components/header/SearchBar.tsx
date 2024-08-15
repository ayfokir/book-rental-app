import React from 'react';
import { Box, InputBase, IconButton, InputAdornment, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';

const SearchBar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen size is less than 600px

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        mx: isSmallScreen ? 1 : 2,
        mt: isSmallScreen ? 1 : 0, // Add top margin for small screens
        width: isSmallScreen ? '100%' : 'auto', // Ensure full width on small screens
      }}
    >
      <InputBase
        placeholder="Search for anything"
        sx={{
          flex: 1,
          border: '1px solid #ddd',
          borderRadius: '9999px',
          px: 2,
          py: isSmallScreen ? 0.5 : 1, // Adjust padding for small screens
          backgroundColor: '#fff',
          boxShadow: 'none',
          pr: 0,
          width: '100%', // Ensure full width for the InputBase
        }}
        endAdornment={
          <InputAdornment position="end" sx={{ pr: 2 }}>
            <IconButton
              type="submit"
              sx={{
                color: 'white',
                backgroundColor: 'red',
                borderRadius: '50%',
                '&:hover': {
                  backgroundColor: 'darkred',
                },
                p: isSmallScreen ? '2px' : "6px",
                marginRight: '-10px',
              }}
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </Box>
  );
};

export default SearchBar;
