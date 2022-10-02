import { createSlice } from '@reduxjs/toolkit'

const calcTotalPrice = (i) => {
  return i.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};

const calcTotalCount = (i) => {
  return i.reduce((sum, obj) => obj.count + sum, 0);
}

const calcItemPrice = (c, p) => {
  const res = c * p
  return res
};



const initialState = {
  totalPrice: 0,
  countItems: 0,
  items: []
}

export const cartPizzaSlice = createSlice({
  name: 'cartPizza',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(obj => obj.id == action.payload.id && obj.size == action.payload.size)
      // Проверка на наличие элемента в стэйте
      if (findItem) {
        //Если есть, то инкрементируем count, добавляем стоймость в totalPrice, добавляем количество в countItems и добавляем стоймость в общую стоймость пицц одной категории
        if (findItem.count < 99) {
          findItem.count++
          findItem.allItemPrice = calcItemPrice(findItem.count, findItem.price)
        }
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
          allItemPrice: action.payload.price
          
          }
        )
      }

      state.countItems = calcTotalCount(state.items)
      state.totalPrice = calcTotalPrice(state.items)
    },
    itemMinus(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id && obj.size == action.payload.size);

      if (findItem) {
            findItem.count--
            findItem.allItemPrice = calcItemPrice(findItem.count, findItem.price)
          }

      state.countItems = calcTotalCount(state.items)
      state.totalPrice = calcTotalPrice(state.items)
    },
    removeItem(state, action) {
        const findItem = state.items.find((obj) => obj.id === action.payload.id && obj.size == action.payload.size);

        if (findItem) {
          state.items = state.items.filter((obj) => obj !== findItem)
          console.log(findItem)
        }

        state.totalPrice = calcTotalPrice(state.items)
        state.countItems = calcTotalCount(state.items)
    },
    clearPizzaItems(state) {
        state.items = []

        state.countItems = calcTotalCount(state.items)
        state.totalPrice = calcTotalPrice(state.items)
    }
  },
})

export const { addItem, removeItem, clearPizzaItems, itemMinus } = cartPizzaSlice.actions

export default cartPizzaSlice.reducer