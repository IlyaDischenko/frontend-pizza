import { createSlice } from '@reduxjs/toolkit'

import { getCode, confirmCode, getUserInfo, updateEmailAction} from './userAsyncThunk'

const initialState = {
  is_sing_in_active: false,
  number: "+7",
  can_send_code: false,
  code_sended: false,
  code: "",
  code_0: "",
  code_1: "",
  code_2: "",
  code_3: "",
  is_login: false,
  is_login_status: "",
  can_confirm_code: false,
  token: "",
  user_data: {
    name: "",
    email: "",
    entrance: "",
    floor: "",
    house: "",
    street: "",
    apartment: "",

},
  userInfoStatus: "",
  updatedMail: "",
  updatedMailStatus: "",
}

export const userStateSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    setSingInPopupTrue: (state) => {
      state.is_sing_in_active = true
    },
    setSingInPopupFalse: (state) => {
        state.is_sing_in_active = false
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
        console.log('sadasdasd', typeof(state.code))
        if (state.code.length == 4) {
            state.can_confirm_code = true
        }
    },
    //////////////////////////////////////// sdas
    setSendedFalse: (state) => {
        state.code_sended = false
    },
    clearCodeTitles: (state) => {
        state.code_0 = ""
        state.code_1 = ""
        state.code_2 = ""
        state.code_3 = ""
        state.code = ""
    },

    updaterEmailReducer: (state, action) => {
        state.updatedMail = action.payload
    }
  },
  extraReducers: {
    [getCode.pending]: (state) => {
        state.code_sended = false
    },
    [getCode.fulfilled]: (state, action) => {
        if (action.payload.status == 200) {
            state.code_sended = true
        }
    },
    [getCode.rejected]: (state) => {
        state.code_sended = false
    },


    [confirmCode.pending]: (state) => {
        state.is_login_status = "error"
    },
    [confirmCode.fulfilled]: (state, action) => {
        if (action.payload.status == 200) {
            state.is_login = true
            state.token = action.payload.token
            state.is_login_status = "success"
        } else if (action.payload.status == 400) {
            state.is_login = false
            state.is_login_status = "invalid"
        }
    },
    [confirmCode.rejected]: (state) => {
        state.is_login = false
        state.is_login_status = "reject"
    },


    [getUserInfo.pending]: (state) => {
        state.userInfoStatus = "error"
    },
    [getUserInfo.fulfilled]: (state, action) => {
        if (action.payload.status == 200) {
    
            state.user_data = { 
                name: action.payload.data.name,
                email: action.payload.data.email,
                entrance: action.payload.data.entrance,
                floor: action.payload.data.floor,
                house: action.payload.data.house,
                street: action.payload.data.street,
                apartment: action.payload.data.apartment,

            }
            state.updatedMail = action.payload.data.email
            state.userInfoStatus = "success"
        } else if (action.payload.status == 400) {

            state.userInfoStatus = "error"
        }
    },
    [getUserInfo.rejected]: (state) => {

        state.userInfoStatus = "reject"
    },

    [updateEmailAction.pending]: (state) => {
        state.updatedMailStatus = "error"
        // state.updatedMail = state.user_data.email
    },
    [updateEmailAction.fulfilled]: (state, action) => {
        if (action.payload.status == 200) {
            state.updatedMailStatus = "success"
            state.user_data.email = state.updatedMail
        } else if (action.payload.status == 400) {
            state.updatedMailStatus = "error"
            state.updatedMail = state.user_data.email
        }
    },
    [updateEmailAction.rejected]: (state) => {
        state.updatedMailStatus = "error"
    },
}
})

export const { setSingInPopupTrue, setSingInPopupFalse, updateNumber, firstNumCode, secondNumCode, thirdNumCode, fourNumCode, setSendedFalse, clearCodeTitles,
    updaterEmailReducer
 } = userStateSlice.actions

export default userStateSlice.reducer