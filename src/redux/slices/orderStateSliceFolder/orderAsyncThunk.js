import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { localUrl, url } from '../../../Config'


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
    }
    const { data } = await axios.post(`${localUrl}/api/set/order`, body)
    
    return data
})

export const get_street = createAsyncThunk('order/get_streets', async () => {
    const { data } = await axios.get(`${localUrl}/api/get/street`)
    return data
})

export const get_order = createAsyncThunk('order/get_orders', async (info) => {
    const { data } = await axios.get(`${localUrl}/api/get/order/${info.order_id}`, {
        // params: {
        //     order_id: 3,
        // },
        headers: {
            Authorization: `${info.token}`,
        },
    },)
    return data
})

export const backout_order = createAsyncThunk('order/backout_order', async (info) => {
    const body = {
        "token": info.token,
        "order_id": info.order_id
    }

    const { data } = await axios.post(`${localUrl}/api/set/order/backout`, body)
    return data
})



