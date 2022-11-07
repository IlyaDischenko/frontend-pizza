import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import s from './MOrder.module.scss'

import MHeader from '../mobileHeader/MobileHeader'
import { Link } from 'react-router-dom'
import { updateApartment, updateEntrance, updateFloor, updateHouse, updateStreet } from '../../redux/slices/UserStateSliceFolder/userSlice';
import { changeComment } from '../../redux/slices/orderStateSliceFolder/orderSlise';
import { get_street, set_order } from '../../redux/slices/orderStateSliceFolder/orderAsyncThunk';
import { setStreet } from '../../redux/slices/UserStateSliceFolder/userSlice';
import PopupInfo from '../../components/popupInfo/PopupInfo'

function MOrder() {
    const cartPizzaState = useSelector((state) => state.cartPizza)
    const cartDrinkState = useSelector((state) => state.cartDrink)
    const cartPromoState = useSelector((state) => state.promo)
    const user = useSelector((state) => state.user)
    const order = useSelector((state) => state.order)
    const popup = useSelector((state) => state.popup)
    const dispatch = useDispatch()

    const [showStreetList, setShowStreetList] = React.useState([])


    React.useEffect(() => {
        dispatch(get_street())
    },[])

    const setStreetValue = (i) => {
        dispatch(setStreet(i))
    } 

    const filteredStreet = order.streets.filter(str => {
        return str.toLowerCase().includes(user.street.toLowerCase())
    })


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

    const findet_street = order.streets.find(obj => obj.toLowerCase() == user.street.toLowerCase())

    const street_style = () => {
        if (showStreetList == false || filteredStreet.length == 0 || findet_street ) {
            return s.streets_none
        } else {
            return s.streets
        }
    }

    const info_message = () => {
        if (!user.streetStatus) {
            return ''
        } else if (!findet_street) {
            return '* выберите улицу из списка'
        } else if (findet_street) {
            return ''
        }
    }

    const successOrGetStreet = () => {
        if (!findet_street) {
            return (
                <div className={s.send_order_link}>
                    <button className={s.send_order_grey} >Оформить заказ</button>
                </div>
            )
        } else if (findet_street) {
            return (
                <Link to="/success" className={s.send_order_link}>
                    <button className={s.send_order} onClick={send_order}>Оформить заказ</button>
                </Link>
            )
        }
    }

    const null_street = () => {
        if (!user.streetStatus) {
            return ''
        } else if (findet_street) {
            return ''
        } else if (!findet_street) {
            return (
                <div className={s.null_street_message}>
                    * К сожалению, зона доставки ограничена. Выберите улицу из списка доступных.
                </div>
            )
        }
    }

    return (
        <>
            <div className={classPreloader()}></div>
            <MHeader />
            <div className={s.adress_block} onClick={() => setShowStreetList(false)}>
                <div className={s.title_first} >Ваш адрес</div>
                <div className={s.street_block} onClick={e => e.stopPropagation()}>
                    <div className={s.info_message}>
                        {info_message()}
                    </div>
                    <input type="text" placeholder='Улица' onChange={(e) => dispatch(updateStreet(e.target.value))} value={user.street}  onClick={() => setShowStreetList(true)}/>
                    <div className={street_style()}>
                        <div className={s.street_list}>
                            {filteredStreet.map((street) => (
                                <li key={street} onClick={() => setStreetValue(street)} >
                                    {street}
                                </li>
                            ))}
                        </div>
                    </div>

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
                    <span className={s.green}>Бесплатно</span>
                </div>
                <div className={s.total}>
                    <span>Способ оплаты</span>
                    <span>{paytype[activePaytype]}</span>
                </div>
            </div>
            {null_street()}
            <div className={s.button} >
                <Link to="/cart" className={s.goback}>
                    <button>
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        </path></svg>
                    назад
                    </button>
                </Link>
                {successOrGetStreet()}
            </div>
        </>
    )
}



export default MOrder