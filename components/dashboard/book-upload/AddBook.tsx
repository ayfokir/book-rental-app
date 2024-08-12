import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  Button,
  Modal,
  Fade,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/Store"; // Adjust the import according to your store setup
import { createBookRequest } from "@/redux/slices/AddBook";
interface BookData {
  book_name: string;
  author_name: string;
  category: string;
}

interface AddBookProps {
  open: boolean;
  onClose: () => void;
}

const categories = ["Fiction", "Business", "Self Help"];

const AddBook: React.FC<AddBookProps> = ({ open, onClose }) => {
  const [bookData, setBookData] = useState<BookData>({
    book_name: "",
    author_name: "",
    category: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useDispatch();
  const { loading, error, success, message } = useSelector( (state: RootState) => state.addedBook);
  // const { setNotification } = useNotification();
  
  useEffect(() => {
    if (success) {
      onClose(); // Close the modal on success or failure
    }
    console.log("see when the store change inside Add Book Modal:", message )
  }, [success, error, message]);
  
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const validateModal = () => {
    const newErrors: Record<string, string> = {};
    if (!bookData.author_name)
      newErrors.author_name = "Author Name is required";
    if (!bookData.book_name) newErrors.book_name = "Book Name is required";
    if (!bookData.category) newErrors.category = "Category is required";
    return newErrors;
  };

  const handleModalSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formErrors = validateModal();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const formData = new FormData(e.currentTarget);
    console.log("see the The book Data:", formData);
    // const result = await CreatBook(formData);
    const result = dispatch(createBookRequest(bookData));
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Fade in={open}>
        <Box
          component="form"
          onSubmit={handleModalSubmit}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add New Book
          </Typography>
          <TextField
            label="Book Name"
            name="book_name"
            autoFocus
            value={bookData.book_name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.book_name)}
            helperText={errors.book_name}
          />
          <TextField
            label="Author Name"
            name="author_name"
            value={bookData.author_name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.author_name)}
            helperText={errors.author_name}
          />
          <TextField
            select
            label="Category"
            name="category"
            value={bookData.category}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.category)}
            helperText={errors.category}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddBook;
