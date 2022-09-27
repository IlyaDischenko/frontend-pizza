import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  countItems: 0,
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // console.log('что пришло', action.payload)
      state.items.push(action.payload)
      // console.log('что после пуша', state.items[1])
      state.totalPrice += action.payload.price
      state.countItems += 1
    },
    removeItem(state, action) {
        state.items.filter((obj) => obj.id !== action.payload)
    },
    clearItems(state) {
        state.totalPrice = 0
        state.countItems = 0
        state.items = []
    }
  },
})

export const { addItem, removeItem, clearItems } = cartSlice.actions

export default cartSlice.reducer