import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getCode = createAsyncThunk('userState/getCode', async (num) => {
    const body = {
        "number": num.substring(1)
    }
    const { data } = await axios.post('https://backend-pizza-test.herokuapp.com/api/gettoken', body)
    return data
})

export const confirmCode = createAsyncThunk('userState/confirmCode', async (dataa) => {
    const body = {
        "number": dataa.num.substring(1),
        "code": dataa.codee
    }
    console.log('slice ',dataa.codee)
    console.log(typeof(dataa.codee))
    const { data } = await axios.post('https://backend-pizza-test.herokuapp.com/api/confirmtoken', body)
    return data
})

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
        state.is_login = false
        state.is_login_status = "error"
    },
    [confirmCode.fulfilled]: (state, action) => {
        if (action.payload.status == 200) {
            state.is_login = true
            state.is_login_status = "success"
        }
    },
    [confirmCode.rejected]: (state) => {
        state.is_login = false
        state.is_login_status = "reject"
    }
}
})

export const { setSingInPopupTrue, setSingInPopupFalse, updateNumber, firstNumCode, secondNumCode, thirdNumCode, fourNumCode, setSendedFalse, clearCodeTitles } = userStateSlice.actions

export default userStateSlice.reducer