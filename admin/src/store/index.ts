import { configureStore } from '@reduxjs/toolkit'
import currentPageReducer from "./reducers/page";

const store = configureStore({
    reducer: {currentPageReducer},
})

export default store;