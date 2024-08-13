import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the User interface
export interface User {
    user_id: number; // Assuming user_id is a number
    email: string;
    location: string;
    Books:  []
}

// Define the state interface
interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
    success: boolean;
    message: string;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
    success: false,
    message: ""
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchUsersStart(state) {
            state.loading = true;
            state.error = null;
            state.success = false;
            state.message = "";
        },
        fetchUsersSuccess(state, action: PayloadAction<User[]>) {
            state.loading = false;
            state.users = action.payload;
            state.success = true;
            state.message = "Users fetched successfully";
        },
        fetchUsersFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
            state.message = "Failed to fetch users";
        },

        addUserStart(state, action: PayloadAction<User>) {
            state.loading = true;
            state.error = null;
            state.success = false;
            state.message = "";
        },
        addUserSuccess(state, action: PayloadAction<User>) {
            state.loading = false;
            state.success = true;
            state.message = "User added successfully";
            state.users.push(action.payload);
        },
        addUserFailure(state, action: PayloadAction<string>) {
            state.success = false;
            state.loading = false;
            state.error = action.payload;
            state.message = "Failed to add user";
        },

        updateUserStart(state, action: PayloadAction<User>) {
            state.loading = true;
            state.error = null;
            state.success = false;
            state.message = "";
        },
        updateUserSuccess(state, action: PayloadAction<User>) {
            state.loading = false;
            state.success = true;
            state.message = "User updated successfully";
            const index = state.users.findIndex(user => user.user_id === action.payload.user_id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
        updateUserFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
            state.message = "Failed to update user";
        },

        deleteUserStart(state, action: PayloadAction<number>) {
            state.loading = true;
            state.error = null;
            state.success = false;
            state.message = "";
        },
        deleteUserSuccess(state, action: PayloadAction<number>) {
            state.loading = false;
            state.success = true;
            state.message = "User deleted successfully";
            state.users = state.users.filter(user => user.user_id !== action.payload);
        },
        deleteUserFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
            state.message = "Failed to delete user";
        },
    },
});

export const {
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
} = userSlice.actions;

export default userSlice.reducer;
