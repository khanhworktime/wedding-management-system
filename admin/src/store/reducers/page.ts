import {createSlice} from '@reduxjs/toolkit'

const currentPage = createSlice({
    name: "currentPage",
    initialState: "dashboard",
    reducers: {
        setPage: (state, action) => state = action.payload
    }
})

const currentPageReducer = currentPage.reducer

export const currentPageSellector = (state:any) => state.currentPageReducer

export const {setPage} = currentPage.actions
export default currentPageReducer