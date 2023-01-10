import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { url } from '../../../Config'

export const getItems = createAsyncThunk('app/getItems', async () => {
    const { data } = await axios.get(`${url}/get/all/web`)
    return data
})