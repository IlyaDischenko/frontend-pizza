import { configureStore } from '@reduxjs/toolkit'
import sort from './slices/sortSlice'
import cart from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    sort,
    cart,
},
})