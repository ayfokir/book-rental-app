import React, { useState } from 'react';
import { Box, TextField, Typography, MenuItem, Button, Grid, Modal, Fade } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const books = ['Book1', 'Book2', 'Book3', 'Add'];
const categories = ['Fiction', 'Business', 'Self Help'];

const Upload: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState('');
  const [quantity, setQuantity] = useState('');
  const [rentPrice, setRentPrice] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [newBookName, setNewBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [category, setCategory] = useState('');

  const handleBookChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === 'Add') {
      setOpenModal(true);
    } else {
      setSelectedBook(event.target.value);
    }
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(event.target.value);
  };

  const handleRentPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRentPrice(event.target.value);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleModalSubmit = () => {
    // Add logic to save the new book to the books array here
    setOpenModal(false);
    setSelectedBook(newBookName);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ textAlign: "center", mb: 4 }}>
        Upload New Book
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <TextField
          select
          label="Select Book"
          value={selectedBook}
          onChange={handleBookChange}
          fullWidth
          sx={{ width: '50%', maxWidth: 400 }} // Adjusted width
        >
          {books.map((book, index) => (
            <MenuItem key={book} value={book} sx={{ color: index === 3 ? "#00ABFF" : "inherit" }}>
              {book}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Grid container spacing={10} sx={{paddingTop: "70px", paddingBottom: "20px"}}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Book Quantity"
            value={quantity}
            onChange={handleQuantityChange}
            fullWidth
            type='number'
            sx={{ height: '40px' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Rent Price for 2 Weeks"
            value={rentPrice}
            onChange={handleRentPriceChange}
            fullWidth
            type='number'
            sx={{ height: '40px' }}
          />
        </Grid>
      </Grid>
      <Box display={"flex"} flexDirection={"column"} sx={{ mt: 2 }}>
        <Button
          component="label"
          sx={{ color: "rgb(0,171,255)", py: "10px", display: 'flex', alignItems: 'center' }}
        >
          <UploadFileIcon sx={{ mr: 1, marginTop: "10px" }} />
          Upload Book Cover
          <input type="file" hidden />
        </Button>
        <Button
          variant="contained"
          sx={{ px: "60px", py: "12px", marginTop: "20px", width: 'fit-content', alignSelf: 'center', color: "00ABFF" }}
        >
          Submit
        </Button>
      </Box>

      {/* Modal for adding a new book */}
      <Modal
        open={openModal}
        onClose={handleModalClose}
        closeAfterTransition
      >
        <Fade in={openModal}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}>
            <Typography variant="h6" gutterBottom>
              Add New Book
            </Typography>
            <TextField
              label="Book Name"
              value={newBookName}
              onChange={(e) => setNewBookName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Author Name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              fullWidth
              margin="normal"
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
            <Button
              variant="contained"
              color="primary"
              onClick={handleModalSubmit}
              sx={{ mt: 2 }}
            >
              Save
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Upload;
