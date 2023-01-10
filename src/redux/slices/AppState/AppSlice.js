import { createSlice } from '@reduxjs/toolkit'
import { getItems } from './appAsyncThunk'


const initialState = {
  work: true,
  noWorkMessage: '',
  drinks_view: true,

  pizzas: [],
  drinks: [],
  pizzas_status: 'loading',
  drinks_status: 'loading',
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {},
    extraReducers: {
        [getItems.pending]: (state) => {
            state.pizzas_status = "loading"
            state.drinks_status = "loading"
        },
        [getItems.fulfilled]: (state, actions) => {
            if (actions.payload.work === true) {
                state.work = true
                state.pizzas = actions.payload.pizza
                state.pizzas_status = "true"

                if (actions.payload.drink_view === true) {
                    state.drinks = actions.payload.drinks
                    state.drinks_status = "true"
                    state.drinks_view = true
                } else if (actions.payload.drink_view === false) {
                    state.drinks_view = false
                }
            } else {
                state.work = false
                state.noWorkMessage = actions.payload.message
            }

        },
        [getItems.rejected]: (state) => {
        }
    }
})
      
  
export const { setPopupInfoTrue, setPopupInfoFalse, update_promocode } = appSlice.actions

export default appSlice.reducer