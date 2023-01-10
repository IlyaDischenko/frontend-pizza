import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { url } from '../../../Config'

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
    const { data } = await axios.get(`${url}/get/all/web`)
    return data
})

const initialState = {
  pizzas: [],
  drinks: [],
  status: 'loading',
  load_pizza_status: 'loading',
  load_drink_status: 'default',
  popupinfo: false
}

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setPopupInfoTrue: (state) => {
            state.popupinfo = true
        },
        setPopupInfoFalse: (state) => {
            state.popupinfo = false
        }

    },
    extraReducers: {
        [fetchItems.pending]: (state) => {
            state.status = 'loading'
        },
        [fetchItems.fulfilled]: (state, action) => {
            state.pizzas = action.payload.pizza
            state.drinks = action.payload.drinks
            state.status = 'success'
        },
        [fetchItems.rejected]: (state) => {
            state.status = 'error'
            state.pizzas = []
            state.drinks = []
        }
    }
})
      
  
export const { setPopupInfoTrue, setPopupInfoFalse } = itemsSlice.actions

export default itemsSlice.reducer