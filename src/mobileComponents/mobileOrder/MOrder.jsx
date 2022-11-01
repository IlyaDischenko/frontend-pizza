import React from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import s from './MOrder.module.scss'

import MHeader from '../mobileHeader/MobileHeader'
import { Link } from 'react-router-dom'
import MLogin from '../mobileLogin/MLogin'
import { updateApartment, updateEntrance, updateFloor, updateHouse, updateStreet } from '../../redux/slices/UserStateSliceFolder/userSlice';
import { changeComment } from '../../redux/slices/orderStateSliceFolder/orderSlise';

function MOrder() {
    const cartPizzaState = useSelector((state) => state.cartPizza)
    const cartDrinkState = useSelector((state) => state.cartDrink)
    const cartPromoState = useSelector((state) => state.promo)
    const user = useSelector((state) => state.user)
    const order = useSelector((state) => state.order)
    const popup = useSelector((state) => state.popup)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [activePaytype, setActivePaytype] = React.useState(0) 
    const paytype = ['Наличные', "Переводом на карту"]
    const onClickPaytype = (i) => {
        setActivePaytype(i)
    }


    return (
        <>
            <MHeader />
            <div className={s.adress_block}>
                <div className={s.title}>Ваш адрес</div>
                <div className={s.street}>
                    <input type="text" placeholder='Улица' onChange={(e) => dispatch(updateStreet(e.target.value))} value={user.street}/>
                </div>
                <div className={s.footer_info}>
                    <div className={s.house}>
                        <input type="text" placeholder='Дом' onChange={(e) => dispatch(updateHouse(e.target.value))} value={user.house}/>
                    </div>
                    <div className={s.entrance}>
                        <input type="text" placeholder='Подъезд' onChange={(e) => dispatch(updateEntrance(e.target.value))} value={user.entrance}/>
                    </div>
                    <div className={s.floor}>
                        <input type="text" placeholder='Этаж' onChange={(e) => dispatch(updateFloor(e.target.value))} value={user.floor}/>
                    </div>
                    <div className={s.apartment}>
                        <input type="text" placeholder='Квартира' onChange={(e) => dispatch(updateApartment(e.target.value))} value={user.apartment}/>
                    </div>
                </div>
                <div className={s.title}>Комментарий к заказу</div>
                <div className={s.comment}>
                    <input type="text" placeholder='Доставьте поскорей' onChange={(e) => dispatch(changeComment(e.target.value))} value={order.comment}/>
                </div>
            </div>
            <div className={s.title}>Способ оплаты</div>
            <div className={s.pay_type}>
                <ul>
                {paytype.map((size, i) => (
                    <li
                    key={size}
                    onClick={() => onClickPaytype(i)}
                    className={activePaytype === i ? s.active : ""}>
                    {size}
                    </li>
                ))}
                </ul>
            </div>
            <div className={s.title}>Ваш заказ:</div>
            <div className={s.your_order}>
                <div className={s.count}>
                    <span>{order.count}</span>
                    <span>{order.sum} ₽</span>
                </div>
                <div className={s.total}>
                    <span>Доставка</span>
                    <span className={s.orange}>Бесплатно</span>
                </div>
                <div className={s.total}>
                    <span>Способ оплаты</span>
                    <span>{paytype[activePaytype]}</span>
                </div>
            </div>
        </>
    )
}

export default MOrder