import React from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import s from './MOrder.module.scss'

import MHeader from '../mobileHeader/MobileHeader'
import { Link } from 'react-router-dom'
import MLogin from '../mobileLogin/MLogin'

function MOrder() {
    const cartPizzaState = useSelector((state) => state.cartPizza)
    const cartDrinkState = useSelector((state) => state.cartDrink)
    const cartPromoState = useSelector((state) => state.promo)
    const popup = useSelector((state) => state.popup)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    return (
        <>
            <MHeader />
            <div className={s.adress_block}>
                <div className={s.title}>Адрес</div>
                <div className={s.street}>
                    <input type="text" placeholder='Улица' />
                </div>
                <div className={s.footer_info}>
                    <div className={s.house}>
                        <input type="text" placeholder='Дом' />
                    </div>
                    <div className={s.entrance}>
                        <input type="text" placeholder='Подъезд' />
                    </div>
                    <div className={s.floor}>
                        <input type="text" placeholder='Этаж' />
                    </div>
                    <div className={s.apartament}>
                        <input type="text" placeholder='Квартира' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MOrder