import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MyOrderItem from './MyOrderItem/MyOrderItem'

import s from './MyOrder.module.scss'
import { Link } from 'react-router-dom'
import { get_orders } from './../../redux/slices/orderStateSliceFolder/orderAsyncThunk';

function MMyOrder() {
    const order = useSelector((state) => state.order)
    const orders = useSelector((state) => state.order.orders)
    const popup = useSelector((state) => state.popup)
    const dispatch = useDispatch()

    React.useEffect(() => {
        // if (order.status === 200) {
            const info = {
                token: popup.token
            }
            dispatch(get_orders(info))
        // }
    },[
        // order.status
    ])

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
    } else {
        return (
            <>
                <div className={s.success_wrapper}>
                    
                    {orders.map((ord) => (
                        <MyOrderItem key={ord.id} {...ord} />
                    ))}

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