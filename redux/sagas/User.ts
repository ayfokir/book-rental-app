import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { ReadUsers } from "@/app/api/read-users/ReadUsers";
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../slices/User"; // Assuming you renamed your slice to UserSlice

export interface User {
  user_id: number;
  email: string;
  location: string;
  Books:  []
}

// Define the API response interface
interface ApiResponse {
  success: boolean;
  message?: string;
  users?: User[];
  error?: string;
}

// Fetch Users
function* fetchUsers(): Generator {
  try {
    const result: ApiResponse = yield call(() => ReadUsers()); // Fetch users using ReadUsers
    console.log("inside read user saga:", result)
    if (result.success) {
      yield put(fetchUsersSuccess(result.users || []));
    } else {
      yield put(fetchUsersFailure(result.error || "Failed to fetch users"));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(
        fetchUsersFailure(error.message || "An unexpected error occurred.")
      );
    } else {
      yield put(fetchUsersFailure("An unexpected error occurred."));
    }
  }
}

// Add User
function* addUser(
  action: PayloadAction<User>
): Generator<any, void, ApiResponse> {
  try {
    const result: ApiResponse = yield call(() => UploadUser(action.payload)); // Add user using UploadUser
    if (result.success) {
      yield put(addUserSuccess(result.message || "User added successfully"));
    } else {
      yield put(addUserFailure(result.error || "Failed to add user"));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(
        addUserFailure(error.message || "An unexpected error occurred.")
      );
    } else {
      yield put(addUserFailure("An unexpected error occurred."));
    }
  }
}

// Update User
function* updateUser(
  action: PayloadAction<{ user_id: number; updateData: User }>
): Generator {
  try {
    const { user_id, updateData } = action.payload;
    const result: ApiResponse = yield call(() => UploadUser(updateData)); // Update user using UploadUser
    if (result.success) {
      yield put(
        updateUserSuccess(result.message || "User updated successfully")
      );
    } else {
      yield put(updateUserFailure(result.error || "Failed to update user"));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(
        updateUserFailure(error.message || "An unexpected error occurred.")
      );
    } else {
      yield put(updateUserFailure("An unexpected error occurred."));
    }
  }
}

// Delete User
function* deleteUser(action: PayloadAction<number>): Generator {
  try {
    const result: ApiResponse = yield call(() => UploadUser(action.payload)); // Delete user using UploadUser
    if (result.success) {
      yield put(deleteUserSuccess(action.payload));
    } else {
      yield put(deleteUserFailure(result.error || "Failed to delete user"));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(
        deleteUserFailure(error.message || "An unexpected error occurred.")
      );
    } else {
      yield put(deleteUserFailure("An unexpected error occurred."));
    }
  }
}

export default function* userSaga(): Generator {
  yield takeLatest(fetchUsersStart.type, fetchUsers);
  yield takeLatest(addUserStart.type, addUser);
  yield takeLatest(updateUserStart.type, updateUser);
  yield takeLatest(deleteUserStart.type, deleteUser);
}
