import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { backout_order } from './../../../redux/slices/orderStateSliceFolder/orderAsyncThunk';

import s from './MMyOrderItem.module.scss'

function MMyOrderItem({ id, pizzas, drink, promocode_item, street, house, apartment, comment, paytype, data, status, totalprice }) {
    const order = useSelector((state) => state.order)
    const popup = useSelector((state) => state.popup)

    const dispatch = useDispatch()

    const pay = () => {
        if (paytype === "cash") {
            return "Наличными"
        } else if (paytype === "sendtocart") {
            return "Переводом на карту"
        }
    }

    // const status_translater = () => {
    //     if (status === "accepted") {
    //         return "Готовится"
    //     } else if (status === "deliver") {
    //         return "Курьер в пути"
    //     }
    // }

    const size_translater = (i) => {
        if (i === 25) {
            return "маленькая"
        } else if (i === 30) {
            return "средняя"
        } else if (i === 35 ) {
            return "большая"
        }
    }

    const promocode_item_transleter = () => {
        if (promocode_item.length === 0) {
            return ""
        } else if (promocode_item.length !== 0) {
            return `• ${promocode_item.title}`
        }
    }

    const comment_check = () => {
        if (comment.length !== 0) {
            return (
            <div className={s.commentblock}>
                <div className={s.title}>Комментарий</div>
                <div className={s.content}>{comment}</div>
            </div>
            )
        }
    }

    const house_check = () => {
        if (house.length !== 0) {
            return `, д. ${house}`
        } else {
            return ""
        }
    } 

    const apartment_check = () => {
        if (apartment.length !== 0) {
            return `, кв. ${apartment}`
        } else {
            return ""
        }
    } 

    const backout_order_func = () => {
        const info = {
            token: popup.token,
            order_id: order.order_id
        }
        dispatch(backout_order(info))
    }

    return (
        <>
            <div className={s.my_order_item}>
                <div className={s.compoundOrder}>
                    <div className={s.compound}>Состав</div>
                    <div className={s.order}>{`Заказ №${id}`}</div>
                </div>
                <div className={s.compoundList}>
                    {pizzas.map((pizz) => (
                        <li key={pizz.id}>{`• ${pizz.title}, ${size_translater(pizz.size)}, ${pizz.count} шт`}</li>
                    ))}
                    {drink.map((drin) => (
                        <li key={drin.id}>{`• ${drin.title}, ${drin.count} шт`}</li>
                    ))}
                    <li>{promocode_item_transleter()}</li>
                </div>
                <div className={s.adresblock}>
                    <div className={s.title}>Адрес</div>
                    <div className={s.content}>{`${street}${house_check()}${apartment_check()}`}</div>
                </div>
                {comment_check()}
                <div className={s.paytypeblock}>
                    <div className={s.title}>Оплата</div>
                    <div className={s.content}>{pay()}</div>
                </div>
                <div className={s.dateblock}>
                    <div className={s.title}>Дата и время</div>
                    <div className={s.content}>{data.replace('T', ' ')}</div>
                </div>
                {/* <div className={s.statusblock}>
                    <div className={s.title}>Статус</div>
                    <div className={s.content}>{status_translater()}</div>
                </div> */}
                <div className={s.footer}>
                    <div className={s.price}>{`${totalprice} ₽`}</div>
                    <div className={s.cancel}>
                        <button onClick={backout_order_func}>Отменить</button>
                    </div>
                </div>
            </div>
        </>
    )
}



export default MMyOrderItem