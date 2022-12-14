import { configureStore } from '@reduxjs/toolkit'
import promo from './slices/cartPromoSlice'
import cartPizza from './slices/cartPizzaSlice'
import cartDrink from './slices/cartDrinkSlice'
import items from './slices/ItemStateSliceFolder/ItemsSlice'
import user from './slices/UserStateSliceFolder/userSlice'
import popup from './slices/PopupStateSliceFolder/popupSlise'
import order from './slices/orderStateSliceFolder/orderSlise'

export const store = configureStore({
  reducer: {
    promo,
    cartPizza,
    cartDrink,
    items,
    user,
    popup,
    order,
},
})