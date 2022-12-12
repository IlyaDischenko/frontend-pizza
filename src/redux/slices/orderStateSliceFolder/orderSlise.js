import { createSlice } from '@reduxjs/toolkit'

import { set_order, get_street, get_order, backout_order } from './orderAsyncThunk'

// import { getCodeAction, confirmCode} from './orderAsyncThunk'

const initialState = {
  comment: '',
  sum: 0,
  count: '0 товаров',
  status: 1,
  getorder_status: 1,
  order_status_message: "",
  streets: [],
  order_id: 0,
  orders: [],
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
    },
    clearOrder: (state) => {
      state.comment = ''
      state.sum = 0
      state.count = '0 товаров'
      state.status = 1
      // state.order_status_message = ""
      state.streets = []
      state.orders = []
    }
  },
  extraReducers: {  
    [set_order.pending]: (state) => {
      state.status = 2
    },
    [set_order.fulfilled]: (state, action) => {
      if (action.payload.status === 200){
        state.status = 200
        state.order_id = action.payload.order_id
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
      } else if (action.payload.status === 462) {
        state.status = 462
        state.order_status_message = "Извините, мы принимаем заказы с 10:00 до 24:00"
      } else if (action.payload.status === 400) {
        state.status = 400
        state.order_status_message = "Неизвестная ошибка"
      } else if (action.payload.status === 401) {
        state.status = 401
        state.order_status_message = "Пожалуйста, авторизуйтесь заново"
      }
    },
    [set_order.rejected]: (state) => {
    },


    [get_street.pending]: (state) => {
    },
    [get_street.fulfilled]: (state, action) => {
      state.streets = action.payload.streets
    },
    [get_street.rejected]: (state) => {

    },


    [get_order.pending]: (state) => {
      state.getorder_status = 2
    },
    [get_order.fulfilled]: (state, action) => {
      if (action.payload.server_status === 200){
        state.orders = action.payload.order_info
        state.getorder_status = 200
      } 
    },
    [get_order.rejected]: (state) => {

    },

    [backout_order.pending]: (state) => {
    },
    [backout_order.fulfilled]: (state, action) => {
      if (action.payload.server_status === 200){
        state.comment = ''
        state.sum = 0
        state.count = '0 товаров'
        state.status = 1
        state.order_status_message = ""
        state.streets = []
        state.order_id = 0
        state.orders = []
      } 
    },
    [backout_order.rejected]: (state) => {

    }
  }
})

export const { changeComment, changeSum, changeCount, clearOrder } = orderSlice.actions

export default orderSlice.reducer