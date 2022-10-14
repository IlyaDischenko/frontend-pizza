import { createSlice } from '@reduxjs/toolkit'

import { getCodeAction, confirmCode} from './popupAsyncThunk'

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

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    isViewTrue: (state) => {
      state.isPopupActive = true
    },
    isViewFalse: (state) => {
        state.isPopupActive = false
    },
    updateNumber: (state, actions) => {

        if (isNaN(Number(actions.payload.slice(-1))) == false) {
            if (actions.payload.length <= 12) {
                state.number = actions.payload
                state.can_send_code = false
                if (actions.payload.length == 12) {
                    state.can_send_code = true
                } else {
                    state.can_send_code = false
                }

            } 
        }

    },
    firstNumCode: (state, actions) => {
        if (isNaN(actions.payload) == false) {
            state.code_0 = String(actions.payload)
        }
        state.code = state.code_0 + state.code_1 + state.code_2 + state.code_3
    },
    secondNumCode: (state, actions) => {
        if (isNaN(actions.payload) == false) {
            state.code_1 = String(actions.payload)
        }
        state.code = state.code_0 + state.code_1 + state.code_2 + state.code_3
    },
    thirdNumCode: (state, actions) => {
        if (isNaN(actions.payload) == false) {
            state.code_2 = String(actions.payload)
        }
        state.code = state.code_0 + state.code_1 + state.code_2 + state.code_3
    },
    fourNumCode: (state, actions) => {
        if (isNaN(actions.payload) == false) {
            state.code_3 = String(actions.payload)
        }
        state.code = String(state.code_0 + state.code_1 + state.code_2 + state.code_3)
        if (state.code.length == 4) {
            state.can_confirm_code = true
        }
    },
    clearCodeTitles: (state) => {
        state.code_0 = ""
        state.code_1 = ""
        state.code_2 = ""
        state.code_3 = ""
        state.code = ""
    },

    exitUser: (state) => {
        state.is_login = false
        state.number = "+7"
        state.code_sended = false
    },
  },
  extraReducers: {
    [getCodeAction.pending]: (state) => {
        state.code_sended = false
    },
    [getCodeAction.fulfilled]: (state, action) => {
        if (action.payload.status == 200) {
            state.code_sended = true
            console.log('adasdqwesafdsfsdfewr')
        }
    },
    [getCodeAction.rejected]: (state) => {
        state.code_sended = false
    },


    [confirmCode.pending]: (state) => {
        state.is_login_status = "default"
    },
    [confirmCode.fulfilled]: (state, action) => {
        if (action.payload.status == 200) {
            state.is_login = true
            state.token = action.payload.token
        } else if (action.payload.status == 400) {
            state.is_login = false
            state.is_login_status = "error"
        }
    },
    [confirmCode.rejected]: (state) => {
        state.is_login = false
        state.is_login_status = "default"
    },
    }
})

export const { isViewTrue, isViewFalse, updateNumber, firstNumCode, secondNumCode, thirdNumCode, fourNumCode, setSendedFalse, clearCodeTitles,
 exitUser} = popupSlice.actions

export default popupSlice.reducer