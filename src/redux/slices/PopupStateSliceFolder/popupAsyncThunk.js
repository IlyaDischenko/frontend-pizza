import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { localUrl, url } from '../../../Config'

export const getCodeAction = createAsyncThunk('popup/getCode', async (num) => {
    const body = {
        "number": num.number.substring(1)
    }
    const { data } = await axios.post(`${localUrl}/api/get/token`, body)
    return data
})

export const confirmCode = createAsyncThunk('popup/confirmCode', async (dataa) => {
    const body = {
        "number": dataa.num.substring(1),
        "code": dataa.codee
    }

    const { data } = await axios.post(`${localUrl}/api/confirmtoken`, body)
    return data
})




