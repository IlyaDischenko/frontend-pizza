import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { localUrl, url } from '../../Config'

export const checkPromocode = createAsyncThunk('promo/checkPromocode', async (info) => {
    const conf = {
            "number": info.number,
            "promocode": info.promocode.toLowerCase().replaceAll(' ','')
    }
    const { data } = await axios.post(`${localUrl}/api/check/promocode`, conf)
    return data
})

const initialState = {
  type: 0,
  promocode_item: [],
  item_price: 0,
  promocode_percent: 0,
  promocode_rub: 0,
  promocode: "",
  min_sum: 0,
  take_status: "default",
  applied_status: "default",
  promocode_message: "",  
  isPopupPromocodeActive: false,
}

export const PromoSlice = createSlice({
  name: 'promo',
  initialState,
  reducers: {
    isViewPromocodeTrue: (state) => {
      state.isPopupPromocodeActive = true
    },
    isViewPromocodeFalse: (state) => {
      state.isPopupPromocodeActive = false
    },
    update_promocode: (state, action) => {
      state.promocode = action.payload
    },
    clear_promocode: (state) => {
      state.type = 0
      state.promocode = ""
      state.promocode_item = []
      state.item_price = 0
      state.promocode_percent = 0
      state.promocode_rub = 0
      state.min_sum = 0
      state.take_status = "default"
      state.applied_status = "default"
      state.promocode_message = ""
    },
    update_message: (state, action) => {
      state.promocode_message = action.payload
    },
    update_applied_status: (state, action) => {
      state.applied_status = action.payload
    }
  },
  extraReducers: {

  [checkPromocode.pending]: (state) => {
  },

  [checkPromocode.fulfilled]: (state, action) => {
    if (action.payload.status === 200){
      if (action.payload.type === 1) {

        state.type = action.payload.type
        state.promocode_percent = Number(action.payload.discount_data)
        state.min_sum = Number(action.payload.min_sum)
        state.take_status = "success"

      } else if (action.payload.type === 2) {

        state.type = action.payload.type
        state.promocode_rub = Number(action.payload.discount_data)
        state.min_sum = Number(action.payload.min_sum)
        state.take_status = "success"

      } else if (action.payload.type === 3) {

        state.type = action.payload.type
        state.promocode_item = action.payload.discount_data
        state.item_price = action.payload.discount_data.price
        state.min_sum = Number(action.payload.min_sum)
        state.take_status = "success"

      }

      
    } else if (action.payload.status === 400) {
      state.take_status = "error"
      state.applied_status = "error"
      state.promocode_message = "???????????????? ???? ????????????. ???????????????????? ????????????"
    } else if (action.payload.status === 401) {
      state.take_status = "error"
      state.applied_status = "error"
      state.promocode_message = "?????????????? ?? ???????? ????????????, ???? ?????????????? ?????? ?????????? ????????????????"
    } else if (action.payload.status === 422) {
      state.take_status = "error"
      state.applied_status = "error"
      state.promocode_message = "???????????????????? ?????????????????????????? ?????????? ?????????????????? ??????????????????????"
    }

  },

  [checkPromocode.rejected]: (state) => {
  }

  }
})

export const { isViewPromocodeTrue, isViewPromocodeFalse, update_promocode, clear_promocode, update_message, update_applied_status } = PromoSlice.actions

export default PromoSlice.reducer