import { configureStore } from '@reduxjs/toolkit'
import sort from './slices/sortSlice'
import cartPizza from './slices/cartPizzaSlice'
import cartDrink from './slices/cartDrinkSlice'
import items from './slices/ItemsSlice'
import user from './slices/UserStateSliceFolder/userSlice'
import popup from './slices/PopupStateSliceFolder/popupSlise'

export const store = configureStore({
  reducer: {
    sort,
    cartPizza,
    cartDrink,
    items,
    user,
    popup,
},
})