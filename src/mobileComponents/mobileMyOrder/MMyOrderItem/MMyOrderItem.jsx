import React from 'react'
// import { useNavigate } from "react-router-dom"; 
// import { useDispatch, useSelector } from 'react-redux'

import s from './MMyOrderItem.module.scss'
// import success_img from './../../img/success.png'
// import MHeader from '../../mobileHeader/MobileHeader'
// import { Link } from 'react-router-dom'
// import { updateApartment, updateEntrance, updateFloor, updateHouse, updateStreet } from '../../redux/slices/UserStateSliceFolder/userSlice';
// import { changeComment } from '../../redux/slices/orderStateSliceFolder/orderSlise';
// import { get_orders } from './../../redux/slices/orderStateSliceFolder/orderAsyncThunk';

function MMyOrderItem({ id, pizzas, drink, promocode_item, street, house, apartment, comment, paytype, data, status, totalprice }) {
    const pay = () => {
        if (paytype === "cash") {
            return "Наличными"
        } else if (paytype === "sendtocart") {
            return "Переводом на карту"
        }
    }

    const status_translater = () => {
        if (status === "accepted") {
            return "Готовится"
        } else if (status === "deliver") {
            return "Курьер в пути"
        }
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
                        <li key={pizz.id}>{`• ${pizz.title}, ${pizz.size} см, ${pizz.count} шт`}</li>
                    ))}
                    {drink.map((drin) => (
                        <li key={drin.id}>{`• ${drin.title}, ${drin.count} шт`}</li>
                    ))}
                    <li>{`• ${promocode_item.title}`}</li>
                </div>
                <div className={s.adresblock}>
                    <div className={s.title}>Адрес</div>
                    <div className={s.content}>{`${street}, д. ${house}, кв. ${apartment}`}</div>
                </div>
                <div className={s.commentblock}>
                    <div className={s.title}>Комментарий</div>
                    <div className={s.content}>{comment}</div>
                </div>
                <div className={s.paytypeblock}>
                    <div className={s.title}>Оплата</div>
                    <div className={s.content}>{pay()}</div>
                </div>
                <div className={s.dateblock}>
                    <div className={s.title}>Дата и время</div>
                    <div className={s.content}>{data.replace('T', ' ')}</div>
                </div>
                <div className={s.statusblock}>
                    <div className={s.title}>Статус</div>
                    <div className={s.content}>{status_translater()}</div>
                </div>
                <div className={s.footer}>
                    <div className={s.price}>{`${totalprice} ₽`}</div>
                    <div className={s.cancel}></div>
                </div>
            </div>
        </>
    )
}



export default MMyOrderItem