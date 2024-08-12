import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { UploadBook } from '@/app/api/upload-book/UploadBook';
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
} from "../slices/BookUpload"; // Assuming you renamed your slice to BookSlice

interface Book {
  book_id?: string;
  owner_id: string;
  book_ref_id: string
  book_cover: string;
  price: string;
  quantity: string;
  status: string;
  book_no: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  books?: Book[];
  error?: string;
}

// Fetch Books
function* fetchBooks(): Generator {
  try {
    const result: ApiResponse = yield call(() => UploadBook()); // Fetch books using UploadBook
    if (result.success) {
      yield put(fetchBooksSuccess(result.books || []));
    } else {
      yield put(fetchBooksFailure(result.error || "Failed to fetch books"));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(fetchBooksFailure(error.message || 'An unexpected error occurred.'));
    } else {
      yield put(fetchBooksFailure('An unexpected error occurred.'));
    }
  }
}

// Add Book
function* addBook(action: PayloadAction<FormData>): Generator<any, void, ApiResponse>  {
  try {
    const result: ApiResponse = yield call(() => UploadBook(action.payload)); // Add book using UploadBook
    if (result.success) {
      yield put(addBookSuccess(result.message || "Book added successfully"));
    } else {
      yield put(addBookFailure(result.error || "Failed to add book"));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(addBookFailure(error.message || 'An unexpected error occurred.'));
    } else {
      yield put(addBookFailure('An unexpected error occurred.'));
    }
  }
}

// Update Book
function* updateBook(action: PayloadAction<{ _id: string, updateData: FormData }>): Generator {
  try {
    const { _id, updateData } = action.payload;
    const result: ApiResponse = yield call(() => UploadBook(updateData)); // Update book using UploadBook
    if (result.success) {
      yield put(updateBookSuccess(result.message || "Book updated successfully"));
    } else {
      yield put(updateBookFailure(result.error || "Failed to update book"));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(updateBookFailure(error.message || 'An unexpected error occurred.'));
    } else {
      yield put(updateBookFailure('An unexpected error occurred.'));
    }
  }
}

// Delete Book
function* deleteBook(action: PayloadAction<string>): Generator {
  try {
    const result: ApiResponse = yield call(() => UploadBook(action.payload)); // Delete book using UploadBook
    if (result.success) {
      yield put(deleteBookSuccess(action.payload));
    } else {
      yield put(deleteBookFailure(result.error || "Failed to delete book"));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(deleteBookFailure(error.message || 'An unexpected error occurred.'));
    } else {
      yield put(deleteBookFailure('An unexpected error occurred.'));
    }
  }
}

export default function* watcherSaga(): Generator {
  yield takeLatest(fetchBooksStart.type, fetchBooks);
  yield takeLatest(addBookStart.type, addBook);
  yield takeLatest(updateBookStart.type, updateBook);
  yield takeLatest(deleteBookStart.type, deleteBook);
}
