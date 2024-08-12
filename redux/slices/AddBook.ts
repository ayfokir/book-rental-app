import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { act } from 'react';

interface BookData {
  book_name: string;
  author_name: string;
  category: string;
}

interface BookState {
  loading: boolean;
  error: string | null;
  success: boolean;
  message: string
}

const initialState: BookState = {
  loading: false,
  error: null,
  success: false,
  message: ""
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    createBookRequest(state, action: PayloadAction<BookData>) {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    createBookSuccess(state, action) {
      state.loading = false;
      state.success = true;
      state.message = action.payload;
    },
    createBookFailure(state, action: PayloadAction<string>) {
      state.success = false;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { createBookRequest, createBookSuccess, createBookFailure } = bookSlice.actions;
export default bookSlice.reducer;
