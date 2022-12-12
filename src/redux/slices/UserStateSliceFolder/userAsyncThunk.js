import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { localUrl, url } from '../../../Config'

export const getUserInfo = createAsyncThunk('userState/getUserInfo', async (tok) => {
    const conf = {
            "token": tok.token
    }
    const { data } = await axios.post(`${localUrl}/api/get/userinfo`, conf)
    return data
})

export const updateEmailAction = createAsyncThunk('userState/updateEmailAction', async (email) => {
    const conf = {
            "token": email.token,
            "email": email.email
    }
    const res = await axios.post(`${localUrl}/api/set/email`, conf)
    .then(function (response) {
        return {"response_status": response.status, "server_status": response.data.status}
    }).catch(function (error) {
        return {"response_status": error.response.status}
    })
    return res
})

export const updateNameAction = createAsyncThunk('userState/updateNameAction', async ( email) => {
    const conf = {
            "token": email.token,
            "name": email.name
    }
    const res = await axios.post(`${localUrl}/api/set/name`, conf)
    .then(function (response) {
        return {"response_status": response.status, "server_status": response.data.status}
    }).catch(function (error) {
        return {"response_status": error.response.status}
    })
    return res
})