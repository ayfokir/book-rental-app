import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Book interface
export interface Book {
    book_id?: string;
    owner_id?: string;
    book_name: string;
    author?: string;
    book_cover: string
    category?: string;
    price: string;
    quantity?: string;
    status?: string ;
    book_no?: string

}

// Define the state interface
interface BookState {
    books: Book[];
    loading: boolean;
    error: string | null; 
}

const initialState: BookState = {
    books: [{
        image: "/trendes/Think and Grow Rich.jpeg",
        title: "Think and Grow Rich",
        description: "A classic self-help book by Napoleon Hill that emphasizes personal development and success principles.",
        rental_price: "5.99",
        rating: "4.8",
      },
      {
        image: "/trendes/The Power of Know.jpeg",
        title: "The Power of Know",
        description: "A motivational book focusing on knowledge and its impact on personal growth and success.",
        rental_price: "4.99",
        rating: "4.5"
      },
      {
        image: "/trendes/Think and Grow Rich.jpeg",
        title: "Think and Grow Rich",
        description: "A classic self-help book by Napoleon Hill that emphasizes personal development and success principles.",
        rental_price: "5.99",
        rating: "4.8"
      },
      {
        image: "/trendes/The Power of Know.jpeg",
        title: "The Power of Know",
        description: "A motivational book focusing on knowledge and its impact on personal growth and success.",
        rental_price: "4.99",
        rating: "4.5"
      },
      {
        image: "/trendes/Rich Dad Poor Dad.jpeg",
        title: "Rich Dad Poor Dad",
        description: "Robert Kiyosaki's guide to personal finance and investing, contrasting the financial philosophies of his two 'dads'.",
        rental_price: "6.99",
        rating: "4.7"
      },
      {
        image: "/trendes/Atomic Habit.jpeg",
        title: "Atomic Habit",
        description: "James Clear’s book on how tiny changes can lead to remarkable results, focusing on habit formation and improvement.",
        rental_price: "5.49",
        rating: "4.9"
      },
      {
        image: "/trendes/Rich Dad Poor Dad.jpeg",
        title: "Rich Dad Poor Dad",
        description: "Robert Kiyosaki's guide to personal finance and investing, contrasting the financial philosophies of his two 'dads'.",
        rental_price: "6.99",
        rating: "4.7"
      },
      {
        image: "/trendes/Atomic Habit.jpeg",
        title: "Atomic Habit",
        description: "James Clear’s book on how tiny changes can lead to remarkable results, focusing on habit formation and improvement.",
        rental_price: "5.49",
        rating: "4.9"
      },
      {
        image: "/trendes/Awakyans.jpg",
        title: "Awakyans",
        description: "A fictional work exploring the adventures of a unique group of characters with special abilities.",
        rental_price: "7.99",
        rating: "4.6"
      },
      {
        image: "/trendes/freen Michaels.jpg",
        title: "freen Michaels",
        description: "A gripping novel about the journey of Freen Michaels through trials and triumphs in a challenging world.",
        rental_price: "6.49",
        rating: "4.4"
      }],
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
