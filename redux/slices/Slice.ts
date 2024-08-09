import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Book interface
export interface Book {
    book_id: string;
    owner_id: string;
    owner: string;
    title: string;
    author: string;
    genre: string;
    category: string;
    description: string;
    rental_price: string;
    quantity: string;
    status: string ;
    book_no: string

}

// Define the state interface
interface BookState {
    books: Book[];
    loading: boolean;
    error: string | null; 
}

const initialState: BookState = {
    books: [],
    loading: false,
    error: null,
};

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        fetchBooksStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchBooksSuccess(state, action: PayloadAction<Book[]>) {
            state.loading = false;
            state.books = action.payload;
        },
        fetchBooksFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        addBookStart(state, action: PayloadAction<Omit<Book, 'book_id'>>) {
            state.loading = true;
            state.error = null;
        },
        addBookSuccess(state, action: PayloadAction<Book>) {
            state.loading = false;
            state.books.push(action.payload);
        },
        addBookFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        updateBookStart(state, action: PayloadAction<Book>) {
            state.loading = true;
            state.error = null;
        },
        updateBookSuccess(state, action: PayloadAction<Book>) {
            state.loading = false;
            const index = state.books.findIndex(book => book.book_id === action.payload.book_id);
            if (index !== -1) {
                state.books[index] = action.payload;
            }
        },
        updateBookFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        deleteBookStart(state, action: PayloadAction<string>) {
            state.loading = true;
            state.error = null;
        },
        deleteBookSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.books = state.books.filter(book => book.book_id !== action.payload);
        },
        deleteBookFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
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
