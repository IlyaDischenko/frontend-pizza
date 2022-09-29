import { configureStore } from '@reduxjs/toolkit'
import sort from './slices/sortSlice'
import cart from './slices/cartSlice'
import items from './slices/ItemsSlice'

export const store = configureStore({
  reducer: {
    sort,
    cart,
    items,
},
})