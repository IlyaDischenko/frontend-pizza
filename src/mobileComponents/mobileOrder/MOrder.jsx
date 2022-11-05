import React from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import s from './MOrder.module.scss'

import MHeader from '../mobileHeader/MobileHeader'
import { Link } from 'react-router-dom'
import { updateApartment, updateEntrance, updateFloor, updateHouse, updateStreet } from '../../redux/slices/UserStateSliceFolder/userSlice';
import { changeComment } from '../../redux/slices/orderStateSliceFolder/orderSlise';
import { set_order } from '../../redux/slices/orderStateSliceFolder/orderAsyncThunk';

function MOrder() {
    const cartPizzaState = useSelector((state) => state.cartPizza)
    const cartDrinkState = useSelector((state) => state.cartDrink)
    const cartPromoState = useSelector((state) => state.promo)
    const user = useSelector((state) => state.user)
    const order = useSelector((state) => state.order)
    const popup = useSelector((state) => state.popup)
    const dispatch = useDispatch()

    const [activePaytype, setActivePaytype] = React.useState(0) 
    const paytype = ['Наличные', "Переводом на карту"]
    const onClickPaytype = (i) => {
        setActivePaytype(i)
    }

    const token = popup.token
    const number = user.number
    const pizza = cartPizzaState.items
    const drink = cartDrinkState.items
    const promo = cartPromoState.promocode
    const street = user.street
    const house = user.house
    const entrance = user.entrance
    const floor = user.floor
    const apartment = user.apartment
    const comment = order.comment


    const paytype_func = () => {
        if (activePaytype == 0) {
            return "cash"
        } else if (activePaytype == 1) {
            return "sendtocart"
        }
    }

    const send_order = () => {
        const inf = {
            token: token,
            number: number,
            pizzas: pizza,
            drinks: drink,
            promocode: promo,
            street: street,
            house:house,
            entrance:entrance,
            floor: floor,
            apartment: apartment,
            device: "mbrowser",
            paytype: paytype_func(),
            comment: comment,
        }
        dispatch(set_order(inf))
    }

    const classPreloader = () => {
        if (order.status == "loading") {
            return s.loading
        } else {
            return 
        }
    }

    return (
        <>
            <div className={classPreloader()}></div>
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
            <div className={s.button} >
                <Link to="/cart" className={s.goback}>
                    <button>
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        </path></svg>
                    назад
                    </button>
                </Link>
                <Link to="/success" className={s.send_order_link}>
                    <button className={s.send_order} onClick={send_order}>Оформить заказ</button>
                </Link>
            </div>
        </>
    )
}



export default MOrder