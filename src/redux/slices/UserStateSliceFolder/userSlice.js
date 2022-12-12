import { createSlice } from '@reduxjs/toolkit'

import { getUserInfo, updateEmailAction, updateNameAction} from './userAsyncThunk'

const initialState = {
  url: "/",

  name: "",
  email: "",
  street: "",
  entrance: "",
  floor: "",
  house: "",
  apartment: "",

  streetStatus: false,

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
    setStreet: (state, action) => {
        state.street = action.payload
    },

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
    },

    updateStreet: (state, action) => {
        state.street = action.payload
        state.streetStatus = true
    },
    updateEntrance: (state, action) => {
        state.entrance = action.payload
    },
    updateFloor: (state, action) => {
        state.floor = action.payload
    },
    updateHouse: (state, action) => {
        state.house = action.payload
    },
    updateApartment: (state, action) => {
        state.apartment = action.payload
    }
  },
  extraReducers: {

    [getUserInfo.pending]: (state) => {
        state.userInfoStatus = "error"
    },
    [getUserInfo.fulfilled]: (state, action) => {
        if (action.payload.status == 200) {
            
            state.name = action.payload.data.name
            state.email = action.payload.data.email
            state.entrance = action.payload.data.entrance
            state.floor = action.payload.data.floor
            state.house = action.payload.data.house
            state.street = action.payload.data.street
            state.apartment = action.payload.data.apartment

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
                state.email = state.updatedMail
            } else {
                state.updatedMailStatus = "error"
                state.updatedMail = state.email
            }
        } else if (action.payload.response_status == 422) {
            state.updatedMailStatus = "error"
            state.updatedMail = state.email
        }
    },
    [updateEmailAction.rejected]: (state) => {
        state.updatedMailStatus = "default"
    },


    [updateNameAction.pending]: (state) => {
        state.updatedNameStatus = "default"
    },
    [updateNameAction.fulfilled]: (state, action) => {
        if (action.payload.response_status == 200) {
            if (action.payload.server_status == 200) {
                state.updatedNameStatus = "success"
                state.name = state.updatedName
            } else {
                state.updatedNameStatus = "error"
                state.updatedName = state.name
            }
        } else if (action.payload.response_status == 422) {
            state.updatedNameStatus = "error"
            state.updatedName = state.name
        }
    },
    [updateNameAction.rejected]: (state) => {
        state.updatedNameStatus = "default"
    },
}
})

export const { setStreet, setUrl, setSendedFalse, clearCodeTitles, updaterEmailReducer, updaterNameReducer, exitUser,
    updateStreet, updateEntrance, updateFloor, updateHouse, updateApartment} = userStateSlice.actions

export default userStateSlice.reducer