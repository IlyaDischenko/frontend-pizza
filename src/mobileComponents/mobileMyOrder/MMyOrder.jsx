import React from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import s from './MMyOrder.module.scss'
import success_img from './../../img/success.png'
import MHeader from '../mobileHeader/MobileHeader'
import { Link } from 'react-router-dom'
import { updateApartment, updateEntrance, updateFloor, updateHouse, updateStreet } from '../../redux/slices/UserStateSliceFolder/userSlice';
import { changeComment } from '../../redux/slices/orderStateSliceFolder/orderSlise';
import { get_orders } from './../../redux/slices/orderStateSliceFolder/orderAsyncThunk';

function MMyOrder() {
    const cartPizzaState = useSelector((state) => state.cartPizza)
    const cartDrinkState = useSelector((state) => state.cartDrink)
    const cartPromoState = useSelector((state) => state.promo)
    const user = useSelector((state) => state.user)
    const order = useSelector((state) => state.order)
    const orders = useSelector((state) => state.order.orders)
    const popup = useSelector((state) => state.popup)
    const dispatch = useDispatch()

    React.useEffect(() => {
        const info = {
            token: popup.token
        }
        dispatch(get_orders(info))
    },[])



    return (
        <>
            <MHeader />
            <div className={s.success_wrapper}>
                <div className={s.img}>
                    {/* <img src={success_img} alt="Успешно" /> */}
                </div>
                <div className={s.text_div}>
                    {orders.map((ord) => (
                        <li key={ord.id}>
                            {ord.data}
                        </li>
                    ))}
                </div>
                <div className={s.button}>
                    <Link to="/" >
                        <button className={s.mainbut}>На главную</button>
                    </Link>
                </div> 
            </div>
        </>
    )
}



export default MMyOrder