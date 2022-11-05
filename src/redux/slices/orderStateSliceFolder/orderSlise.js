import { createSlice } from '@reduxjs/toolkit'

import { set_order } from './orderAsyncThunk'

// import { getCodeAction, confirmCode} from './orderAsyncThunk'

const initialState = {
  comment: '',
  sum: 0,
  count: '0 товаров',
  status: "default"
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

    }
  }
})

export const { changeComment, changeSum, changeCount } = orderSlice.actions

export default orderSlice.reducer