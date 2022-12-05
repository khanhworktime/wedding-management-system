import {createSlice} from '@reduxjs/toolkit'

const loungeSplice = createSlice({
    name: "lounges",
    initialState: {
        lounges: Array<any>()
    },
    reducers: {
        setLounge: (state, action) => {
            return {lounges:[...action.payload]}
        }
    }
})

const loungesReducer = loungeSplice.reducer

export const loungesSelector = (state:any) => state.loungesReducer.lounges

export const {setLounge} = loungeSplice.actions
export default loungesReducer