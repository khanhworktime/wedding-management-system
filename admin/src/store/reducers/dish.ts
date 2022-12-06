import {createSlice} from '@reduxjs/toolkit'

const dishSplice = createSlice({
    name: "dish",
    initialState: {
        dish: Array<any>()
    },
    reducers: {
        setDish: (state, action) => {
            return {dish:[...action.payload]}
        }
    }
})

const dishReducers = dishSplice.reducer

export const dishSelector = (state:any) => state.serviceReducers.dish

export const {setDish} = dishSplice.actions
export default dishReducers