import {createSlice} from '@reduxjs/toolkit'

const bookingSlice = createSlice({
    name: "bookingRecord",
    initialState: {
        bookingRecord: Array<any>()
    },
    reducers: {
        setBookingRecord: (state, action) => ({bookingRecord: action.payload})
    }
})

const bookingRecordReducer = bookingSlice.reducer

export const bookingRecordSelector = (state:any) => state.bookingRecordReducer.bookingRecord

export const {setBookingRecord} = bookingSlice.actions
export default bookingRecordReducer