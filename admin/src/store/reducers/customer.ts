import {createSlice} from '@reduxjs/toolkit'

const customerSlice = createSlice({
    name: "customer",
    initialState: {},
    reducers: {
        setCustomers: (state, action) => state = action.payload
    }
})

const customerReducer = customerSlice.reducer

export const customerSelector = (state:any) => state.customerReducer

export const {setCustomers} = customerSlice.actions
export default customerReducer