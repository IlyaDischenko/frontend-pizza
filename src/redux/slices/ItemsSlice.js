import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
    const { data } = await axios.get('https://backend-pizza-test.herokuapp.com/get/all')
    return data
})

const initialState = {
  pizzas: [],
  drinks: [],
  status: 'loading'
}

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
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
      
  
export const { setPizzas } = itemsSlice.actions

export default itemsSlice.reducer