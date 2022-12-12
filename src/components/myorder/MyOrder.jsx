import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MyOrderItem from './MyOrderItem/MyOrderItem'

import s from './MyOrder.module.scss'
import { Link } from 'react-router-dom'
import { get_order } from './../../redux/slices/orderStateSliceFolder/orderAsyncThunk';
import Loading from '../Loading/Loading'

function MMyOrder() {
    const order = useSelector((state) => state.order)
    const orders = useSelector((state) => state.order.orders)
    const popup = useSelector((state) => state.popup)
    const dispatch = useDispatch()


    if (orders.length === 0) {
        return (
            <div className={s.null_orders} >
                <div className={s.null_text}>
                    У вас нет активных заказов<br></br>Закажите пиццу, а мы постараемся привезти её как можно скорее
                </div>
                <Link to="/" className={s.button}>
                    <button className={s.mainbut}>Выбрать пиццу</button>
                </Link>
            </div>
        )
    } else if (orders.getorder_status === 2) {
        return (
            <Loading />
        )
    } else {
        return (
            <>
                <div className={s.success_wrapper}>
                    
                    
                    {orders ? <MyOrderItem key={orders.id} {...orders} />: <></>}

                    <div className={s.button}>
                        <Link to="/" >
                            <button className={s.mainbut}>На главную</button>
                        </Link>
                    </div> 
                </div>
            </>
        )
    }
}



export default MMyOrder