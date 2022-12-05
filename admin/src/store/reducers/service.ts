import {createSlice} from '@reduxjs/toolkit'

const serviceSplce = createSlice({
    name: "service",
    initialState: {
        service: Array<any>()
    },
    reducers: {
        setService: (state, action) => {
            return {service:[...action.payload]}
        }
    }
})

const serviceReducers = serviceSplce.reducer

export const serviceSelector = (state:any) => state.serviceReducers.service

export const {setService} = serviceSplce.actions
export default serviceReducers