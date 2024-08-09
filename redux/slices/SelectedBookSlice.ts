// selectedBookSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Book interface
export interface Book {
    title: string;
    image: string;
    description: string;
    rental_price: string;
    rating: string;
}

interface SelectedBookState {
    selectedBook: Book | null;
    loading: boolean;
    error: string | null;
}

const initialState: SelectedBookState = {
    selectedBook: null,
    loading: false,
    error: null,
};

const selectedBookSlice = createSlice({
    name: 'selectedBook',
    initialState,
    reducers: {
        setSelectedBook(state, action: PayloadAction<Book>) {
            console.log("Selected book: ", action.payload);
            state.selectedBook = action.payload;
        },
        clearSelectedBook(state) {
            state.selectedBook = null;
        },
        // Optionally handle loading and error states
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
});

export const { setSelectedBook, clearSelectedBook, setLoading, setError } = selectedBookSlice.actions;

export default selectedBookSlice.reducer;
