import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Book {
    book_id: number; // Assuming book_id is a number
    book_ref_id: number;
    owner_id: number;
    book_cover: string;
    price: number; // Assuming price is a number
    quantity: number; // Assuming quantity is a number
    status: string;
    book_no: string;
    created_at: Date; // Or string, depending on how you handle dates
    updated_at: Date; // Or string, depending on how you handle dates
    owner: {
    email: string;
    role: string
    };
    book: {
        book_name: string;
        author_name: string;
        category: string;
    }
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

        updateBookStart(state, action: PayloadAction<FormData>) {
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
