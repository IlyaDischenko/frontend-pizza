import { configureStore } from '@reduxjs/toolkit'
import sort from './slices/sortSlice'
import cartPizza from './slices/cartPizzaSlice'
import cartDrink from './slices/cartDrinkSlice'
import items from './slices/ItemsSlice'

export const store = configureStore({
  reducer: {
    sort,
    cartPizza,
    cartDrink,
    items,
},
})