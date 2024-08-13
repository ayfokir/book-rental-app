// rootReducer.ts
import { combineReducers } from "redux";
import bookReducer from "../slices/Book";
import selectedBookReducer from "../slices/SelectedBookSlice";
import AddBookReducer from "../slices/AddBook";
import UserReducer from "../slices/User"
const rootReducer = combineReducers({
  books: bookReducer,
  selectedBook: selectedBookReducer,
  addedBook: AddBookReducer,
  users: UserReducer
});

// export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

// In the above code:

// The state managed by bookReducer will be accessible under state.books.
// The state managed by selectedBookReducer will be accessible under state.selectedBook.
