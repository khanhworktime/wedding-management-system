import { configureStore } from '@reduxjs/toolkit'
import customerReducer from './reducers/customer';
import currentPageReducer from "./reducers/page";
import bookingRecordReducer from "./reducers/bookingRecord";
import loungesReducer from "./reducers/lounge";
import serviceReducers from "./reducers/service";
import dishReducers from "./reducers/dish";
import menuReducers from "./reducers/menu";

const store = configureStore({
    reducer: {currentPageReducer, customerReducer, bookingRecordReducer, loungesReducer, serviceReducers, dishReducers, menuReducers},
})

export default store;