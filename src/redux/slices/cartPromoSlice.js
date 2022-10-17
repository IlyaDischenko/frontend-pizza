import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const checkPromocode = createAsyncThunk('promo/checkPromocode', async (info) => {
    const conf = {
            "number": info.number,
            "promocode": info.promocode
    }
    const { data } = await axios.post('https://backend-pizza-test.herokuapp.com/api/check/promocode', conf)
    return data
})

const initialState = {
  promocode_item: [],
  promocode_percent: 0,
  promocode_rub: 0,
  promocode: "",
  promocode_status: "",  
}

export const PromoSlice = createSlice({
  name: 'promo',
  initialState,
  reducers: {
    update_promocode: (state, action) => {
      state.promocode = action.payload
    }
  },
  extraReducers: {

  [checkPromocode.pending]: (state) => {
  },

  [checkPromocode.fulfilled]: (state, action) => {
    console.log(action.payload)
    if (action.payload.status == 200){
      if (action.payload.type == 1) {
        // console.log('primenen item', action.payload.item)
        state.promocode_item = action.payload.item
        state.promocode_status = "applied"
      } else if (action.payload.type == 2) {
        // console.log('primenen rub', action.payload.rub)
        state.promocode_rub = action.payload.rub
        state.promocode_status = "applied"
      } else if (action.payload.type == 3) {
        // console.log('primenen percent', action.payload.percent)
        state.promocode_percent = action.payload.percent
        state.promocode_status = "applied"
      }
      // console.log('primenen', action.payload.percent)
      
    } else if (action.payload.status == 400) {
      state.promocode_status = "error"
    }

  },

  [checkPromocode.rejected]: (state) => {
  }

  }
})

export const { update_promocode } = PromoSlice.actions

export default PromoSlice.reducer