import { createSlice } from '@reduxjs/toolkit'

import { getUserInfo, updateEmailAction, updateNameAction} from './userAsyncThunk'

const initialState = {
  url: "/",

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
  updatedMailStatus: "default",

  updatedName: "",
  updatedNameStatus: "default",
}

export const userStateSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    setUrl: (state, action) => {
        state.url = action.payload
    },


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
    },

    updaterNameReducer: (state, action) => {
        state.updatedName = action.payload
    },

    exitUser: (state) => {
        state.is_login = false
    }
  },
  extraReducers: {

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
            state.updatedName = action.payload.data.name
            state.userInfoStatus = "success"
        } else if (action.payload.status == 400) {

            state.userInfoStatus = "error"
        }
    },
    [getUserInfo.rejected]: (state) => {

        state.userInfoStatus = "reject"
    },

    [updateEmailAction.pending]: (state) => {
        state.updatedMailStatus = "default"
    },
    [updateEmailAction.fulfilled]: (state, action) => {
        if (action.payload.response_status == 200) {
            if (action.payload.server_status == 200) {
                state.updatedMailStatus = "success"
                state.user_data.email = state.updatedMail
            } else {
                state.updatedMailStatus = "error"
                state.updatedMail = state.user_data.email
            }
        } else if (action.payload.response_status == 422) {
            state.updatedMailStatus = "error"
            state.updatedMail = state.user_data.email
        }
    },
    [updateEmailAction.rejected]: (state) => {
        state.updatedMailStatus = "default"
    },


    [updateNameAction.pending]: (state) => {
        state.updatedNameStatus = "default"
    },
    [updateNameAction.fulfilled]: (state, action) => {
        console.log('red',action.payload)
        if (action.payload.response_status == 200) {
            if (action.payload.server_status == 200) {
                state.updatedNameStatus = "success"
                state.user_data.name = state.updatedName
            } else {
                state.updatedNameStatus = "error"
                state.updatedName = state.user_data.name
            }
        } else if (action.payload.response_status == 422) {
            state.updatedNameStatus = "error"
            state.updatedName = state.user_data.name
        }
    },
    [updateNameAction.rejected]: (state) => {
        state.updatedNameStatus = "default"
    },
}
})

export const {  setUrl, setSendedFalse, clearCodeTitles, updaterEmailReducer, updaterNameReducer, exitUser } = userStateSlice.actions

export default userStateSlice.reducer