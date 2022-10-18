import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const checkPromocode = createAsyncThunk('promo/checkPromocode', async (info) => {
    const conf = {
            "number": info.number,
            "promocode": info.promocode.toLowerCase()
    }
    const { data } = await axios.post('https://backend-pizza-test.herokuapp.com/api/check/promocode', conf)
    return data
})

const initialState = {
  type: 0,
  promocode_item: {},
  promocode_percent: 0,
  promocode_rub: 0,
  promocode: "",
  min_sum: 0,
  take_status: "default",
  applied_status: "default",
  promocode_message: "",  
}

export const PromoSlice = createSlice({
  name: 'promo',
  initialState,
  reducers: {
    update_promocode: (state, action) => {
      state.promocode = action.payload
    },
    clear_promocode: (state) => {
      state.type = 0
      state.promocode = ""
      state.promocode_item = {}
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
    if (action.payload.status == 200){
      if (action.payload.type == 1) {

        state.type = action.payload.type
        state.promocode_percent = Number(action.payload.discount_data)
        state.min_sum = Number(action.payload.min_sum)
        state.take_status = "success"
        // state.promocode_message = `Скидка применена: ${state.promocode_percent}%`
      } else if (action.payload.type == 2) {

        state.type = action.payload.type
        state.promocode_rub = Number(action.payload.discount_data)
        state.min_sum = Number(action.payload.min_sum)
        state.take_status = "success"
        // state.promocode_message = `Скидка применена: ${state.promocode_rub}₽`
      } else if (action.payload.type == 3) {

        state.type = action.payload.type
        state.promocode_item = action.payload.discount_data
        state.min_sum = Number(action.payload.min_sum)
        state.take_status = "success"
        // sadsadasdasdasdasdasdasd
        state.promocode_message = "Элемент добавлен в корзину"
      }

      
    } else if (action.payload.status == 400) {
      state.take_status = "error"
      state.promocode_message = "Промокод не найден. Попробуйте другой"
    } else if (action.payload.status == 401) {
      state.take_status = "error"
      state.promocode_message = "Войдите с того номера, на который был выдан промокод"
    } else if (action.payload.status == 422) {
      state.take_status = "error"
      state.promocode_message = "Количество использования этого промокода закончилось"
    }

  },

  [checkPromocode.rejected]: (state) => {
  }

  }
})

export const { update_promocode, clear_promocode, update_message, update_applied_status } = PromoSlice.actions

export default PromoSlice.reducer