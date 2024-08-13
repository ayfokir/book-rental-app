import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { UploadBook } from "@/app/api/upload-book/UploadBook";
import { ReadBookUpload } from "@/app/api/read-book-upload/ReadBookUpload";
import { EditBookUpload } from "@/app/api/EditBookUpload/EditBookUpload";
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
} from "../slices/Book"; // Assuming you renamed your slice to BookSlice

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

interface ApiResponse {
  success: boolean;
  message?: string;
  books: Book[];
  error?: string;
  
}

// Fetch Books
function* fetchBooks(): Generator {
  try {
    const result: ApiResponse = yield call(() => ReadBookUpload()); // Fetch books using UploadBook
    if (result.success) {
      yield put(fetchBooksSuccess(result.books || []));
    } else {
      yield put(fetchBooksFailure(result.error || "Failed to fetch books"));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(
        fetchBooksFailure(error.message || "An unexpected error occurred.")
      );
    } else {
      yield put(fetchBooksFailure("An unexpected error occurred."));
    }
  }
}

// Add Book
function* addBook(action: PayloadAction<FormData>): Generator<any, void, ApiResponse> {
  try {
    const result: ApiResponse = yield call(() => UploadBook(action.payload)); // Add book using UploadBook
    if (result.success) {
      yield put(addBookSuccess(result.message || "Book added successfully"));
    } else {
      yield put(addBookFailure(result.error || "Failed to add book"));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(
        addBookFailure(error.message || "An unexpected error occurred.")
      );
    } else {
      yield put(addBookFailure("An unexpected error occurred."));
    }
  }
}

// Update Book
function* updateBook(
  action: PayloadAction<FormData>): Generator {
  try {
    // const { _id, updateData } = action.payload;
    const result: ApiResponse = yield call(() => EditBookUpload(action.payload)); // Update book using UploadBook
    if (result.success) {
      yield put(
        updateBookSuccess(result.message || "Book updated successfully")
      );
    } else {
      yield put(updateBookFailure(result.error || "Failed to update book"));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(
        updateBookFailure(error.message || "An unexpected error occurred.")
      );
    } else {
      yield put(updateBookFailure("An unexpected error occurred."));
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
      yield put(
        deleteBookFailure(error.message || "An unexpected error occurred.")
      );
    } else {
      yield put(deleteBookFailure("An unexpected error occurred."));
    }
  }
}

export default function* watcherSaga(): Generator {
  yield takeLatest(fetchBooksStart.type, fetchBooks);
  yield takeLatest(addBookStart.type, addBook);
  yield takeLatest(updateBookStart.type, updateBook);
  yield takeLatest(deleteBookStart.type, deleteBook);
}
