import { configureStore } from '@reduxjs/toolkit'
import customerReducer from './reducers/customer';
import currentPageReducer from "./reducers/page";
import bookingRecordReducer from "./reducers/bookingRecord";

const store = configureStore({
    reducer: {currentPageReducer, customerReducer, bookingRecordReducer},
})

export default store;