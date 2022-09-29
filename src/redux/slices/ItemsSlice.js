import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
    const { data } = await axios.get('https://backend-pizza-test.herokuapp.com/get')
    return data
})

const initialState = {
  pizzas: [],
  status: 'loading'
}

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setPizzas(state, action) {
            state.pizzas = action.payload
        }
    },
    extraReducers: {
        [fetchItems.pending]: (state) => {
            state.status = 'loading'
        },
        [fetchItems.fulfilled]: (state, action) => {
            state.pizzas = action.payload.pizza
            state.status = 'success'
        },
        [fetchItems.rejected]: (state) => {
            state.status = 'error'
            state.pizzas = []
        }
    }
})
      
  
export const { setPizzas } = itemsSlice.actions

export default itemsSlice.reducer