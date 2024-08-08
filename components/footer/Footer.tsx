import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: 'black', color: 'white', py: 2 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" component="span" sx={{ mr: 1 }}>
              🌐
            </Typography>
            <Typography variant="body2" component="span" sx={{ mr: 2 }}>
              Ethiopia
            </Typography>
            <Typography variant="body2" component="span" sx={{ mr: 2 }}>
              | English (US)
            </Typography>
            <Typography variant="body2" component="span" sx={{ mr: 2 }}>
              | $ (USD)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" component="span" sx={{ mr: 2 }}>
              © 2024 Etsy, Inc.
            </Typography>
            <Link href="#" underline="hover" color="inherit" sx={{ mr: 2 }}>
              Terms of Use
            </Link>
            <Link href="#" underline="hover" color="inherit" sx={{ mr: 2 }}>
              Privacy
            </Link>
            <Link href="#" underline="hover" color="inherit" sx={{ mr: 2 }}>
              Interest-based ads
            </Link>
            <Link href="#" underline="hover" color="inherit" sx={{ mr: 2 }}>
              Local Shops
            </Link>
            <Link href="#" underline="hover" color="inherit">
              Regions
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
