import { createSlice } from '@reduxjs/toolkit'

// import { getCodeAction, confirmCode} from './orderAsyncThunk'

const initialState = {
  comment: ''
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    changeComment: (state, action) => {
      state.comment = action.payload
    },
    

  },
  extraReducers: {}
})

export const { changeComment } = orderSlice.actions

export default orderSlice.reducer