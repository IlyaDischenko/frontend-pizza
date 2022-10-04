import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getCode = createAsyncThunk('userState/getCode', async () => {
    const { data } = await axios.get('https://backend-pizza-test.herokuapp.com/get')
    return data
})

const initialState = {
  is_sing_in_active: false,
  number: "+7",
  can_send_code: false,
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

    }
  },
})

export const { setSingInPopupTrue, setSingInPopupFalse, updateNumber } = userStateSlice.actions

export default userStateSlice.reducer