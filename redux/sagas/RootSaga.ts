import { all } from 'redux-saga/effects';
import bookUploadSaga from './BookUpload';
import bookSaga from './AddBook';
// import dataSaga from './dataSaga';

export default function* rootSaga() {
    yield all([
        bookUploadSaga(),
        bookSaga()
        // dataSaga(),
        // Add other sagas here
    ]);
}
