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
  promocode_item: {},
  promocode_percent: 0,
  promocode_rub: 0,
  promocode: "",
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
      state.promocode = ""
      state.promocode_item = {}
      state.promocode_percent = ""
      state.promocode_rub = ""
      state.applied_status = "default"
      state.promocode_message = ""
    }
  },
  extraReducers: {

  [checkPromocode.pending]: (state) => {
  },

  [checkPromocode.fulfilled]: (state, action) => {
    console.log(action.payload)
    if (action.payload.status == 200){
      if (action.payload.type == 1) {

        state.promocode_percent = Number(action.payload.discount_data)
        state.applied_status = "success"
        state.promocode_message = `Скидка применена: ${state.promocode_percent}%`
      } else if (action.payload.type == 2) {

        state.promocode_rub = Number(action.payload.discount_data)
        state.applied_status = "success"
        state.promocode_message = `Скидка применена: ${state.promocode_rub}₽`
      } else if (action.payload.type == 3) {

        state.promocode_item = action.payload.discount_data
        state.applied_status = "success"
        state.promocode_message = "Элемент добавлен в корзину"
      }

      
    } else if (action.payload.status == 400) {
      state.applied_status = "error"
      state.promocode_message = "Промокод не найден. Попробуйте другой"
    } else if (action.payload.status == 401) {
      state.applied_status = "error"
      state.promocode_message = "Войдите с того номера, на который был выдан промокод"
    } else if (action.payload.status == 422) {
      state.applied_status = "error"
      state.promocode_message = "Количество использования этого промокода закончилось"
    }

  },

  [checkPromocode.rejected]: (state) => {
  }

  }
})

export const { update_promocode, clear_promocode } = PromoSlice.actions

export default PromoSlice.reducer