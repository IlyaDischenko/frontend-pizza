import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import s from './Order.module.scss'

// import MHeader from '../mobileHeader/MobileHeader'
import { Link } from 'react-router-dom'
import { updateApartment, updateEntrance, updateFloor, updateHouse, updateStreet } from './../../redux/slices/UserStateSliceFolder/userSlice';
import { changeComment } from './../../redux/slices/orderStateSliceFolder/orderSlise';
import { get_street, set_order } from '../../redux/slices/orderStateSliceFolder/orderAsyncThunk';
import { setStreet } from '../../redux/slices/UserStateSliceFolder/userSlice';

function Order() {
    const cartPizzaState = useSelector((state) => state.cartPizza)
    const cartDrinkState = useSelector((state) => state.cartDrink)
    const cartPromoState = useSelector((state) => state.promo)
    const user = useSelector((state) => state.user)
    const order = useSelector((state) => state.order)
    const popup = useSelector((state) => state.popup)
    const dispatch = useDispatch()

    const [showStreetList, setShowStreetList] = React.useState(false)


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

    const forpromo = () => {
        if (cartPromoState.applied_status === "success") {
            return cartPromoState.promocode
        } else {
            return ""
        }
    }

    const token = popup.token
    const number = user.number
    const pizza = cartPizzaState.items
    const drink = cartDrinkState.items
    const promo = forpromo()
    const street = user.street
    const house = user.house
    const entrance = user.entrance
    const floor = user.floor
    const apartment = user.apartment
    const comment = order.comment


    const paytype_func = () => {
        if (activePaytype === 0) {
            return "cash"
        } else if (activePaytype === 1) {
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
            device: "browser",
            paytype: paytype_func(),
            comment: comment,
        }
        dispatch(set_order(inf))
    }

    const classPreloader = () => {
        if (order.status === 2) {
            return s.loading
        } else {
            return 
        }
    }

    const findet_street = order.streets.find(obj => obj.toLowerCase() === user.street.toLowerCase())

    const street_style = () => {
        if (showStreetList === false || filteredStreet.length === 0 || findet_street ) {
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
                <Link to="/myorder" className={s.send_order_link}>
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

    // if (cartPizzaState.items.length === 0 && cartDrinkState.items.length === 0 && cartPromoState.promocode_item.length === 0) {
    //     return (
    //         <>
    //             {/* <MHeader /> */}
    //             <main>
    //                 <div className={s.root_empty}>
    //                     <div className={s.empty_wrapper}>
    //                         <div className={s.empty_bottom}>
    //                             <div className={s.empty_title}>Корзина пустая!</div>
    //                             <div className={s.empty_description}>Перейдите на главную страницу и добавьте понравившийся товар.</div>
    //                             <Link to="/" className={s.link_to_main}><button>Выбрать пиццу</button></Link>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </main>
    //         </>
    //     ) 
    // } else {
        return (
        <div className={s.order_wrapper}>
            <div className={classPreloader()}></div>
            {/* <MHeader /> */}
            <div className={s.adress_block} onClick={() => setShowStreetList(false)}>
                <div className={s.title_first} >Ваш адрес</div>
                <script type="text/javascript" charSet="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor:a45d758e1a8c03f71e9001c2a97fe8db4fafc06b743c39270150f0613c3ecd1c&amp;width=540&amp;height=540&amp;lang=ru_RU&amp;scroll=true"></script>
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
                    <input type="text" placeholder='Доставьте поскорей...' onChange={(e) => dispatch(changeComment(e.target.value))} value={order.comment}/>
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
        </div>
    )
}
// }



export default Order