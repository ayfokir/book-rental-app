import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  Button,
  Grid,
  FormHelperText,
} from "@mui/material";
// import { useNotification } from '@/context/NotificationContext';
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
// import { UploadBook } from '@/app/api/upload-book/UploadBook';
import { ReadBooks } from "@/app/api/read-books/ReadBooks";
import { useAuth } from "@/context/AuthContext";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import AddBook from "./AddBook";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/Store"; // Adjust the import according to your store setup
import { addBookStart } from "@/redux/slices/Book";
import { useSearchParams } from 'next/navigation'
import { updateBookStart } from "@/redux/slices/Book";

interface Book {
  book_id: number;
  book_name: string;
  author_name: string;
  category: string;
}

interface FormData {
  selectedBook: string;
  quantity: string;
  price: string;
  bookCover: File | null | string
}

const Upload: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    selectedBook: "",
    quantity: "",
    price: "",
    bookCover: null,
  });
  const [openModal, setOpenModal] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { pending } = useFormStatus();
  // const { setNotification } = useNotification();
  const { error, success, message, loading } = useSelector( (state: RootState) => state.books);
  
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  console.log("see id please:", id)
  const router = useRouter();
  const { userId } = useAuth();
  const dispatch = useDispatch();
  const selectedBooks = useSelector( (state: RootState) => state.books);
  

 useEffect(() => {
    if (success) {
      setFormData((prev) => ({
        ...prev,
        selectedBook: "",
        quantity: "",
        price: "",
        bookCover: null,
      }));
      // router.push("/dashboard")
    }
  }, [success, message]);
  
  useEffect (()  => {
    if(id && selectedBooks.books.length > 0) {
  let book  =  selectedBooks.books.filter((book)  => book.book_id === parseInt(id))
      console.log("see selected book:", book)
      setFormData((prev) =>  ({
        ...prev,
        selectedBook: book[0]?.book?.book_name,
        quantity:  book[0]?.quantity.toString(),
        price: book[0]?.price.toString(),
        bookCover: book[0]?.book_cover
      }))
    }
  }, [id ])

  useEffect(() => {
    const ReadAllBooks = async () => {
      const fetchedBooks = await ReadBooks();
      // console.log("see books:", fetchedBooks);
      // Always include the "Add" option
      console.log("see list of books:", fetchedBooks)
      const booksWithAddOption = (fetchedBooks.books ?? [])?.concat({
        book_id: -1, // Use a unique identifier for the "Add" option
        book_name: "Add",
        author_name: "",
        category: "",
      });
      setBooks(booksWithAddOption);
    };
    ReadAllBooks();
  }, [openModal]);
  
  console.log("see id here:", id)
  console.log("see formData:", formData)


  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.bookCover) newErrors.bookCover = "Book Cover is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.quantity) newErrors.quantity = "Quantity is required";
    if (!formData.selectedBook) newErrors.selectedBook = "Book is required";

    return newErrors;
  };

  const handleFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "bookCover" && files) {
      setFormData((prevState) => ({
        ...prevState,
        bookCover: files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const handleBookChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "Add") {
      setOpenModal(true);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        selectedBook: event.target.value,
      }));
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formErrors = validateForm();
    console.log("see error:", formErrors);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    // setNotification({ status: 'none', message: '' });
    const formDatas = new FormData(e.currentTarget);
    // Add additional values to the FormData object
    const singlBook = books.filter(
      (book) => book.book_name === formDatas.get("selectedBook")
    );
    console.log("see book_id", singlBook[0].book_id);
    const book_ref_id = singlBook[0].book_id;
    formDatas.append("owner_id", `${userId}`); // Replace '12345' with the actual user_id
    formDatas.append("status", `free`); // Replace '12345' with the actual user_id
    formDatas.append("book_ref_id", `${book_ref_id}`); // Replace '67890' with the actual book_id
    // Handle the file input
    if (typeof formData?.bookCover === 'string') {
      console.log("see the path:", formData.bookCover)
      // If bookCover is a string (path), handle it accordingly
      formDatas.append("book_cover_path", formData.bookCover);
    } else if (formData.bookCover instanceof File) {
      console.log("see the file:", formData.bookCover)
      // If bookCover is a File, handle it as a file
      formDatas.append("book_cover", formData.bookCover);
    } else {
      console.error("No valid book cover selected");
    }
  
    console.log("see the The book Data:", formData);
    // const result = await UploadBook(formData);
    if(id) {
      console.log("see id:", id)
      formDatas.append("book_id", id)
    
      dispatch(updateBookStart(formDatas))
    }else{
      const result = dispatch(addBookStart(formDatas));
    }
  };
  
  return (
    <Box sx={{ p: 2 , marginTop: "24px"}} >
      <Typography variant="h5" gutterBottom sx={{ textAlign: "center", mb: 4 }}>
        Upload New Book
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <TextField
            select
            label="Select Book"
            name="selectedBook"
            value={formData.selectedBook}
            onChange={handleBookChange}
            fullWidth
            sx={{ width: "50%", maxWidth: 400 }}
            error={Boolean(errors.selectedBook)}
            helperText={errors.selectedBook}
          >
            {books?.map((book) => (
              <MenuItem
                key={book.book_id}
                value={book.book_name}
                sx={{ color: book.book_name === "Add" ? "#00ABFF" : "inherit" }}
              >
                {book.book_name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Grid
          container
          spacing={10}
          sx={{ paddingTop: "70px", paddingBottom: "20px" }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              label="Book Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleFormDataChange}
              fullWidth
              type="number"
              sx={{ height: "40px" }}
              error={Boolean(errors.quantity)}
              helperText={errors.quantity}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Rent Price for 2 Weeks"
              name="price"
              value={formData.price}
              onChange={handleFormDataChange}
              fullWidth
              type="number"
              sx={{ height: "40px" }}
              error={Boolean(errors.price)}
              helperText={errors.price}
            />
          </Grid>
        </Grid>
        <Box display={"flex"} flexDirection={"column"} sx={{ mt: 2 }}>
          <Button
            component="label"
            startIcon={<UploadOutlinedIcon />}
            sx={{
              color: "primary.main",
              textTransform: "none",
              fontSize: "1rem",
            }}
          >
            <Typography sx={{ fontSize: "12px", my: "20px" }}>
              Upload Book Cover
            </Typography>
            <input
              type="file"
              name="bookCover"
              hidden
              onChange={handleFormDataChange}
            />
            {errors.bookCover && (
              <FormHelperText error sx={{ ml: "9px" }}>
                {errors.bookCover}
              </FormHelperText>
            )}
          </Button>
          <Button
            type="submit"
            disabled={pending}
            variant="contained"
            sx={{
              px: "80px",
              py: "14px",
              marginTop: "20px",
              width: "fit-content",
              alignSelf: "center",
              color: "00ABFF",
              borderRadius: "10x",
            }}
          >
            {pending ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </Box>
      <AddBook open={openModal} onClose={handleModalClose} />
    </Box>
  );
};

export default Upload;
