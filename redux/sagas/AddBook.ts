import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { createBookRequest, createBookSuccess, createBookFailure } from '../slices/AddBook';
import { CreatBook } from '@/app/api/create-book/CreateBook';

interface CreateBookPayload {
  book_name: string;
  author_name: string;
  category: string;
}

interface CreateBookResponse {
  success: boolean;
  message?: string;
  error?: string;
}

function* createBookSaga(action: PayloadAction<CreateBookPayload>): Generator<any, void, CreateBookResponse> {
  try {
    // Convert plain object to FormData
    const formData = new FormData();
    Object.entries(action.payload).forEach(([key, value]) => {
    formData.append(key, value as string);
    });

    // Call CreatBook with the FormData
    const result: CreateBookResponse = yield call(() => CreatBook(formData));
    console.log("inside createBookSaga", result)
    if (result.success) {
    yield put(createBookSuccess(result.message || "Book registered successfully"));
    } else {
      yield put(createBookFailure(result.error || 'Book registration failed.'));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(createBookFailure(error.message || 'An unexpected error occurred.'));
    } else {
      yield put(createBookFailure('An unexpected error occurred.'));
    }
  }
}

export default function* bookSaga(): Generator<any, void, any> {
  yield takeLatest(createBookRequest.type, createBookSaga);
}
