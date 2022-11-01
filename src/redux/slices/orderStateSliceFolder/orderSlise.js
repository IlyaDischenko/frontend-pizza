import { createSlice } from '@reduxjs/toolkit'

// import { getCodeAction, confirmCode} from './orderAsyncThunk'

const initialState = {
  comment: '',
  sum: 0,
  count: '',
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
  extraReducers: {}
})

export const { changeComment, changeSum, changeCount } = orderSlice.actions

export default orderSlice.reducer