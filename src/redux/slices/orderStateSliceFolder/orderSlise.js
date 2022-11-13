import { createSlice } from '@reduxjs/toolkit'

import { set_order, get_street, get_orders } from './orderAsyncThunk'

// import { getCodeAction, confirmCode} from './orderAsyncThunk'

const initialState = {
  comment: '',
  sum: 0,
  count: '0 товаров',
  status: 1,
  order_status_message: "",
  streets: [],

  orders: [
    {
      "id": 1,
      "pizzas": [{
        "id": 1,
        "title": "Сыр и бекон",
        "size": 25,
        "count": 4
      }],
      "drink": [{
        "id": 23,
        "title": "Морс",
        "count": 9
      }],
      "promocode_item": "",
      "street": "Зарыганская",
      "house": 11,
      "apartment": 22,
      "comment": "Быстрее, пожалуйста",
      "paytype": "cash",
      "data": "2022-11-12T12:22:41",
      "status": "accepted",
      "totalprice": 1222
    }
  ],
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    changeComment: (state, action) => {
      state.comment = action.payload
    },
    changeSum: (state, action) => {
      state.sum = action.payload
    },
    changeCount: (state, action) => {
      state.count = action.payload
    }
  },
  extraReducers: {  
    [set_order.pending]: (state) => {
      state.status = 2
    },
    [set_order.fulfilled]: (state, action) => {
      if (action.payload.status === 200){
        state.status = 200
        state.order_status_message = "Мы уже начали готовить ваш заказ"
      } else if (action.payload.status === 450) {
        state.status = 450
        state.order_status_message = "Не найден промокод"
      } else if (action.payload.status === 451) {
        state.status = 451
        state.order_status_message = "Промокод привязан к другому номеру телефона"
      } else if (action.payload.status === 452) {
        state.status = 452
        state.order_status_message = "Количество использования этого промокода закончилось"
      } else if (action.payload.status === 460) {
        state.status = 460
        state.order_status_message = "Сумма заказа меньше минимальной суммы для использования промокода"
      } else if (action.payload.status === 461) {
        state.status = 461
        state.order_status_message = "Сумма заказа вместе со скидкой меньше нуля"
      } else if (action.payload.status === 400) {
        state.status = 400
        state.order_status_message = "Неизвестная ошибка"
      } else if (action.payload.status === 401) {
        state.status = 401
        state.order_status_message = "Пожалуйста, авторизайтесь заного"
      }
    },
    [set_order.rejected]: (state) => {

    },


    [get_street.pending]: (state) => {
    },
    [get_street.fulfilled]: (state, action) => {
      state.streets = action.payload.street
    },
    [get_street.rejected]: (state) => {

    },


    [get_orders.pending]: (state) => {
    },
    [get_orders.fulfilled]: (state, action) => {
      state.orders = action.payload
    },
    [get_orders.rejected]: (state) => {

    }
  }
})

export const { changeComment, changeSum, changeCount } = orderSlice.actions

export default orderSlice.reducer