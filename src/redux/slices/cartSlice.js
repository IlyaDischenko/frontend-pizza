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
      const findItem = state.items.find(obj => obj.id == action.payload.id && obj.size == action.payload.size)
      // Проверка на наличие элемента в стэйте
      if (findItem) {
        //Если есть, то инкрементируем count, добавляем стоймость в totalPrice, добавляем количество в countItems и добавляем стоймость в общую стоймость пицц одной категории
        findItem.count++
        state.totalPrice += findItem.price
        state.countItems += 1
        findItem.allItemPrice += action.payload.price
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
          allItemPrice: action.payload.price
          
        }
        )
        state.totalPrice += action.payload.price
        state.countItems += 1
      }
    },
    itemPlus(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id && obj.size == action.payload.size);

      if (findItem) {
        findItem.count++
        state.totalPrice += findItem.price
        state.countItems += 1
        findItem.allItemPrice += findItem.price
      }
    },
    removeItem(state, action) {
        state.items.filter((obj) => obj.id !== action.payload.id)
    },
    clearItems(state) {
        state.totalPrice = 0
        state.countItems = 0
        state.items = []
    }
  },
})

export const { addItem, removeItem, clearItems, itemPlus } = cartSlice.actions

export default cartSlice.reducer