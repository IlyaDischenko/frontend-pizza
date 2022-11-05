import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const set_order = createAsyncThunk('order/set_order', async (info) => {
    const body = {
        "token": info.token,
        "pizzas": info.pizzas,
        "drinks": info.drinks,
        "promocode": info.promocode,
        "street": info.street,
        "house": info.house,
        "entrance": info.entrance,
        "floor": info.floor,
        "apartment": info.apartment,
        "device": info.device,
        "paytype": info.paytype,
        "comment": info.comment,
        "status": "accepted",
    }
    const { data } = await axios.post('https://backend-pizza-test.herokuapp.com/api/set/order', body)
    return data
})





