import React from 'react';
import { Box, InputBase, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  return (
    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center',  mx: 2 }}>
      <InputBase
        placeholder="Search for anything"
        sx={{
          flex: 1,
          border: '1px solid #ddd',
          borderRadius: '9999px',
          px: 2,
          py: 1,
          backgroundColor: '#fff',
          boxShadow: 'none',
          pr: 0 
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
                p: '6px',
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
