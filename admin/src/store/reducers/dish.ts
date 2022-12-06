import {createSlice} from '@reduxjs/toolkit'
import IDish, {orderConverter} from "../../interface/IDish";

const dishSplice = createSlice({
    name: "dish",
    initialState: {
        dish: Array<any>(),
        groups: {
            soup: Array<any>(),
            salad: Array<any>(),
            main: Array<any>(),
            dessert: Array<any>(),
            other: Array<any>()
        },
    },
    reducers: {
        setDish: (state, action) => {
            let newDishes = action.payload;
            let newGroups = {...state.groups}
            let prop:"soup" | "salad" | "other" | "dessert" | "main";
            for(prop in newGroups) {
                newGroups[prop] = newDishes.filter((dish: IDish)=>orderConverter(dish.order) === prop)
            }
            return {...state, groups: newGroups, dish:[...action.payload]}
        }
    }
})

const dishReducers = dishSplice.reducer

export const dishSelector = (state:any) => state.dishReducers.dish
export const groupsSelector = (state:any) => state.dishReducers.groups

export const {setDish} = dishSplice.actions
export default dishReducers