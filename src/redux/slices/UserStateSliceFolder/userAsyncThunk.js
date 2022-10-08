import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getCode = createAsyncThunk('userState/getCode', async (num) => {
    const body = {
        "number": num.number.substring(1)
    }
    const { data } = await axios.post('https://backend-pizza-test.herokuapp.com/api/get/token', body)
    return data
})

export const confirmCode = createAsyncThunk('userState/confirmCode', async (dataa) => {
    const body = {
        "number": dataa.num.substring(1),
        "code": dataa.codee
    }

    const { data } = await axios.post('https://backend-pizza-test.herokuapp.com/api/confirmtoken', body)
    return data
})

export const getUserInfo = createAsyncThunk('userState/getUserInfo', async (tok) => {
    const conf = {
            "token": tok.token
    }
    const { data } = await axios.post('https://backend-pizza-test.herokuapp.com/api/get/userinfo', conf)
    return data
})

export const updateEmailAction = createAsyncThunk('userState/updateEmailAction', async ( email) => {
    const conf = {
            "token": email.token,
            "email": email.email
    }
    const res = await axios.post('https://backend-pizza-test.herokuapp.com/api/set/email', conf)
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
    const res = await axios.post('https://backend-pizza-test.herokuapp.com/api/set/name', conf)
    .then(function (response) {
        return {"response_status": response.status, "server_status": response.data.status}
    }).catch(function (error) {
        return {"response_status": error.response.status}
    })
    return res
})