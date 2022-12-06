import { configureStore } from '@reduxjs/toolkit'
import customerReducer from './reducers/customer';
import currentPageReducer from "./reducers/page";
import bookingRecordReducer from "./reducers/bookingRecord";
import loungesReducer from "./reducers/lounge";
import serviceReducers from "./reducers/service";
import dishReducers from "./reducers/dish";

const store = configureStore({
    reducer: {currentPageReducer, customerReducer, bookingRecordReducer, loungesReducer, serviceReducers, dishReducers},
})

export default store;