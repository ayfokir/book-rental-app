import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { AxiosResponse } from 'axios'; // Import AxiosResponse type
import {
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
} from '../slices/Slice'; // Assuming you renamed your slice to BookSlice

interface Book {
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

interface ApiResponse {
  data: {
    success: boolean;
    books: Book[];
  };
}

// Fetch Books
// Define API endpoints
const API_URL: string | undefined = process.env.REACT_APP_API_URL;
function* fetchBooks(): Generator {
  try {
    const response = yield call(axios.get, `${API_URL}/api/books`); // Updated endpoint
    const typedResponse = response as ApiResponse;
    console.log("Fetched books:", typedResponse);
    yield put(fetchBooksSuccess(typedResponse.data.books));
  } catch (error: any) {
    yield put(fetchBooksFailure(error.message));
  }
}

// Add Book
function* addBook(action: PayloadAction<FormData>): Generator {
  const API_URL: string = process.env.REACT_APP_API_URL || '';
  try {
    const response: any = yield call(axios.post, `${API_URL}/api/books`, action.payload); // Updated endpoint
    const typedResponse = response as AxiosResponse<any, ApiResponse>; // Assert type to AxiosResponse<any, ApiResponse>
    console.log("Added book:", typedResponse);
    yield put(addBookSuccess(typedResponse.data.book)); // Use typedResponse.data.books[0]
  } catch (error: any) {
    yield put(addBookFailure(error.message));
  }
}

// Update Book
function* updateBook(action: PayloadAction<{ _id: string }>): Generator {
  try {
    const { _id } = action.payload;
    console.log("Updating book with ID:", _id);
    // Append _id to the URL as a query parameter
    const response: any = yield call(axios.patch, `${API_URL}/api/books/${_id}`, action.payload); // Updated endpoint
    const typedResponse = response as AxiosResponse<any, ApiResponse>;
    yield put(updateBookSuccess(typedResponse.data.book));
  } catch (error: any) {
    yield put(updateBookFailure(error.message));
  }
}

// Delete Book 
function* deleteBook(action: PayloadAction<string>): Generator {
  console.log("Deleting book with ID:", action.payload);
  try {
    yield call(axios.delete, `${API_URL}/api/books/${action.payload}`); // Updated endpoint
    yield put(deleteBookSuccess(action.payload));
  } catch (error: any) {
    yield put(deleteBookFailure(error.message));
  }
}

export default function* watcherSaga(): Generator {
  yield takeLatest(fetchBooksStart.type, fetchBooks);
  yield takeLatest(addBookStart.type, addBook);
  yield takeLatest(updateBookStart.type, updateBook);
  yield takeLatest(deleteBookStart.type, deleteBook);
}
