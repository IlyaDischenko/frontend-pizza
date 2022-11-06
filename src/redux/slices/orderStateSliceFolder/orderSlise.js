import { createSlice } from '@reduxjs/toolkit'

import { set_order, get_street } from './orderAsyncThunk'

// import { getCodeAction, confirmCode} from './orderAsyncThunk'

const initialState = {
  comment: '',
  sum: 0,
  count: '0 товаров',
  status: "default",
  order_status: "",
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
      state.status = "loading"
    },
    [set_order.fulfilled]: (state, action) => {
      state.status = "success"
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