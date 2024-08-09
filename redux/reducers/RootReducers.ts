// rootReducer.ts
import { combineReducers } from 'redux';
import bookReducer from '../slices/Slice'
// import selectedBookReducer from '../slices/selectedBookSlice';

const rootReducer = combineReducers({
  books: bookReducer,
  // selectedBook: selectedBookReducer,
});

// export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

// In the above code:

// The state managed by bookReducer will be accessible under state.books.
// The state managed by selectedBookReducer will be accessible under state.selectedBook.