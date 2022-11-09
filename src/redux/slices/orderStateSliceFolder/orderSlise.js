import { createSlice } from '@reduxjs/toolkit'

import { set_order, get_street } from './orderAsyncThunk'

// import { getCodeAction, confirmCode} from './orderAsyncThunk'

const initialState = {
  comment: '',
  sum: 0,
  count: '0 товаров',
  status: 1,
  order_status_message: "",
  streets: []
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
      } else if (action.payload.status === 461) {
        state.status = 461
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

    }
  }
})

export const { changeComment, changeSum, changeCount } = orderSlice.actions

export default orderSlice.reducer