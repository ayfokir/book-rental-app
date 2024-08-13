import { all } from 'redux-saga/effects';
import bookUploadSaga from './Book';
import bookSaga from './AddBook';
import userSaga from './User';
// import dataSaga from './dataSaga';

export default function* rootSaga() {
    yield all([
        bookUploadSaga(),
        bookSaga(),
        userSaga()
        // dataSaga(),
        // Add other sagas here
    ]);
}
