
import React from 'react';
import { Popover, List, ListItemButton, ListItemText, Box } from '@mui/material';

interface CategoryPopoverProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
}

const categories = [
  'Fiction',
  'Non-Fiction',
  'Mystery',
  'Science Fiction',
  'Fantasy',
  'Biography',
  'History',
  'Romance',
  'Thriller',
  'Young Adult',
];

// Simple overlay component
const DimOverlay: React.FC = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimming effect
      zIndex: 1200, // Place it behind the popover
    }}
  />
);

const CategoryPopover: React.FC<CategoryPopoverProps> = ({ anchorEl, open, onClose }) => {
  return (
    <>
      {open && <DimOverlay />}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        slotProps={{
          paper: {
            sx: {
              zIndex: 1300, // Ensure popover is above the overlay
              width: 300, 
              height: 500,        // Set the width of the popover container
              paddingTop: 2,      // Set the padding-top of the popover container
              padding: 2,         
            },
          },
        }}
    
      >
        <List>
          {categories.map((category, index) => (
            <ListItemButton key={index} onClick={onClose}>
              <ListItemText primary={category} />
            </ListItemButton>
          ))}
        </List>
      </Popover>
    </>
  );
};

export default CategoryPopover;
