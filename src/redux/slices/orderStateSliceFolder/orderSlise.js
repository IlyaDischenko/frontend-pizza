import { createSlice } from '@reduxjs/toolkit'

import { getCodeAction, confirmCode} from './orderAsyncThunk'

const initialState = {
  isPopupActive: false,
  number: "+7",
  can_send_code: false,
  code_sended: false,
  code: "",
  code_0: "",
  code_1: "",
  code_2: "",
  code_3: "",
  is_login: false,
  is_login_status: "default",
  can_confirm_code: false,
  confirm_code_status: "default",
  token: "",
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    isViewTrue: (state) => {
      state.isPopupActive = true
    },
  },
  extraReducers: {}
})

export const { isViewTrue } = orderSlice.actions

export default orderSlice.reducer