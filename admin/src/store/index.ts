import { configureStore } from '@reduxjs/toolkit'
import customerReducer from './reducers/customer';
import currentPageReducer from "./reducers/page";
import bookingRecordReducer from "./reducers/bookingRecord";
import loungesReducer from "./reducers/lounge";

const store = configureStore({
    reducer: {currentPageReducer, customerReducer, bookingRecordReducer, loungesReducer},
})

export default store;