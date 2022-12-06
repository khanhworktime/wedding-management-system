import {createSlice} from '@reduxjs/toolkit'

const menuSplice = createSlice({
    name: "menu",
    initialState: {
        menu: Array<any>()
    },
    reducers: {
        setMenu: (state, action) => {
            return {menu:[...action.payload]}
        }
    }
})

const menuReducers = menuSplice.reducer

export const menuSelector = (state:any) => state.menuReducers.menu

export const {setMenu} = menuSplice.actions
export default menuReducers