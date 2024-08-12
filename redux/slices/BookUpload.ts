import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Book interface
export interface Book {
  book_id?: string;
  book_ref_id: string
  owner_id: string;
  book_cover: string;
  price: string;
  quantity: string;
  status: string;
  book_no: string;
}

// Define the state interface
interface BookState {
    books: Book[];
    loading: boolean;
    error: string | null;
    success: boolean;
    message: string;
}

const initialState: BookState = {
    books: [],
    loading: false,
    error: null,
    success: false,
    message: ""
};

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        fetchBooksStart(state) {
            state.loading = true;
            state.error = null;
            state.success = false;
            state.message = "";
        },
        fetchBooksSuccess(state, action: PayloadAction<Book[]>) {
            state.loading = false;
            state.books = action.payload;
            state.success = true;
            state.message = "Books fetched successfully";
        },
        fetchBooksFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
            // state.message = "Failed to fetch books";
        },

        addBookStart(state, action: PayloadAction<FormData>) {
            state.loading = true;
            state.error = null;
            state.success = false;
            state.message = "";
        },
        addBookSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.success = true;
            state.message = action.payload || "Book added successfully";
            // state.books.push(action.payload);
        },
        addBookFailure(state, action: PayloadAction<string>) {
            state.success = false;
            state.loading = false;
            state.error = action.payload;
            // state.message = "Failed to add book";
        },

        updateBookStart(state, action: PayloadAction<Book>) {
            state.loading = true;
            state.error = null;
            state.success = false;
            state.message = "";
        },
        updateBookSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.success = true;
            state.message = "Book updated successfully";
            // const index = state.books.findIndex(book => book.book_id === action.payload.book_id);
            // if (index !== -1) {
            //     state.books[index] = action.payload;
            // }
        },
        updateBookFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
            // state.message = "Failed to update book";
        },

        deleteBookStart(state, action: PayloadAction<string>) {
            state.loading = true;
            state.error = null;
            state.success = false;
            state.message = "";
        },
        deleteBookSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.success = true;
            state.message = "Book deleted successfully";
            state.books = state.books.filter(book => book.book_id !== action.payload);
        },
        deleteBookFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
            // state.message = "Failed to delete book";
        },
    },
});

export const {
    fetchBooksStart,
    fetchBooksSuccess,
    fetchBooksFailure,
    addBookStart,
    addBookSuccess,
    addBookFailure,
    updateBookStart,
    updateBookSuccess,
    updateBookFailure,
    deleteBookStart,
    deleteBookSuccess,
    deleteBookFailure,
} = bookSlice.actions;

export default bookSlice.reducer;
