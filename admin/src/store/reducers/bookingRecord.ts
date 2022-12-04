import {createSlice} from '@reduxjs/toolkit'

const bookingSlice = createSlice({
    name: "bookingRecord",
    initialState: {},
    reducers: {
        setBookingRecord: (state, action) => state = action.payload
    }
})

const bookingRecordReducer = bookingSlice.reducer

export const bookingRecordSelector = (state:any) => state.bookingRecord

export const {setBookingRecord} = bookingSlice.actions
export default bookingRecordReducer