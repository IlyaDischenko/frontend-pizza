import React from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import s from './MOrder.module.scss'

import MHeader from '../mobileHeader/MobileHeader'
import { Link } from 'react-router-dom'
import MLogin from '../mobileLogin/MLogin';

function Main() {
    const cartPizzaState = useSelector((state) => state.cartPizza)
    const cartDrinkState = useSelector((state) => state.cartDrink)
    const cartPromoState = useSelector((state) => state.promo)
    const popup = useSelector((state) => state.popup)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loginOrPay = (isLog) => {

        if (!isLog) {
            <MLogin /> 
        } else {
            return <div>asdcvewrqwe</div> 
        }
        
    }


    return (
        <>
            <MHeader />
            {loginOrPay(popup.is_login)}
            <div> asdsad </div>
        </>
    )
}

export default Main