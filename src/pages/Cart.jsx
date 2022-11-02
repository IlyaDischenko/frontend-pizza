import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
// import Math from Math

import s from './../components/cart/Cart.module.scss'
import CartItemPizza from '../components/cart/CartItemPizza/CartItemPizza'
import CartItemDrink from '../components/cart/CartItemDrink/CartItemDrink'
import CartItemPromo from '../components/cart/CartItemPromo/CartItemPromo'
import { clearPizzaItems } from './../redux/slices/cartPizzaSlice'
import { clearDrinkItems } from './../redux/slices/cartDrinkSlice'
import { update_promocode, checkPromocode, clear_promocode, update_message, update_applied_status } from './../redux/slices/cartPromoSlice'


import emptyImg from './../img/emptyCart.png'

function Cart() {
    const cartPizzaState = useSelector((state) => state.cartPizza)
    const cartDrinkState = useSelector((state) => state.cartDrink)
    const cartPromoState = useSelector((state) => state.promo)
    const popup = useSelector((state) => state.popup)


    const dispatch = useDispatch()

    const clear = () => {
        dispatch(clearPizzaItems())
        dispatch(clearDrinkItems())
        dispatch(clear_promocode())
    }

    const onClickCheck = () => {
        const dataPromo = () => {
            if (popup.is_login == true){
                return {"number": popup.number.substring(1), "promocode": cartPromoState.promocode}
            } else {
                return {"number": "", "promocode": cartPromoState.promocode}
            }
        }

        dispatch(checkPromocode(dataPromo()))
    }

    const onClickClearPromo = () => {
        dispatch(clear_promocode())
    }

    const stylePromoInput = () => {
        if (cartPromoState.take_status == "default") {
            return s.promocode_input
        } else if (cartPromoState.take_status == "success") {
            return s.promocode_input_success
        } else if (cartPromoState.take_status == "error") {
            return s.promocode_input_error
        }
    }

    const stylePromoMessage = () => {
        if (cartPromoState.applied_status == "default") {
            return s.promocode_message
        } else if (cartPromoState.applied_status == "success") {
            return s.promocode_message_success
        } else if (cartPromoState.applied_status == "error") {
            return s.promocode_message_error
        }
    }

    const readOrInput = () => {
        if (cartPromoState.take_status == "success") {
            return "false"
        } else if (cartPromoState.take_status != "success") {
            return ""
        }
    }

    const promoButton = () => {
        if (cartPromoState.take_status == "success") {
            return (                  
                <div className={s.promocode_button} onClick={onClickClearPromo}>
                    <button>Изменить</button>
                </div>
                ) 
        } else if (cartPromoState.take_status != "success") {
            return (
                <div className={s.promocode_button} onClick={onClickCheck}>
                    <button>Применить</button>
                </div>  
            )
        }
    }

    const colorSumm = () => {
        if (cartPromoState.applied_status == "success") {
            return s.sum_span_applied
        } else {
            return s.sum_span
        }
    }

    const summ = cartPizzaState.totalPrice + cartDrinkState.totalPrice 
    const summCart = () => {

        if (cartPromoState.type == 2) {
            if (summ >= cartPromoState.min_sum) {
                dispatch(update_message(`Скидка применена: ${cartPromoState.promocode_rub}₽`))
                dispatch(update_applied_status("success"))
                return summ - cartPromoState.promocode_rub
            } else {
                dispatch(update_message(`Минимальная сумма заказа: ${cartPromoState.min_sum}₽`))
                dispatch(update_applied_status("default"))
                return summ
            }
            
        } else if (cartPromoState.type == 1) {
            if (summ >= cartPromoState.min_sum) {
                dispatch(update_message(`Скидка применена: ${cartPromoState.promocode_percent}%`))
                dispatch(update_applied_status("success"))
                return Math.trunc((summ / 100) * (100 - cartPromoState.promocode_percent))
            } else {
                dispatch(update_message(`Минимальная сумма заказа: ${cartPromoState.min_sum}₽`))
                dispatch(update_applied_status("default"))
                return summ
            }
        
        } else if (cartPromoState.type == 3) {
            if (summ >= cartPromoState.min_sum) {
                dispatch(update_message(`Добавлено: ${cartPromoState.promocode_item.title}`))
                dispatch(update_applied_status("success"))
                return summ + cartPromoState.item_price
            } else {
                dispatch(update_message(`Минимальная сумма заказа: ${cartPromoState.min_sum}₽`))
                dispatch(update_applied_status("default"))
                return summ
            }
        
        }else return summ
    }

    const allCount = () => {
        if (cartPromoState.type == 3) {
            return cartPizzaState.countItems + cartDrinkState.countItems + 1
        } else return cartPizzaState.countItems + cartDrinkState.countItems
    } 

    const promoitem = () => {
        if (cartPromoState.promocode_item.length == 0) {
            return <></>
        } else {
            return (
                <div>
                    <CartItemPromo data={cartPromoState.promocode_item} />
                </div>
            )
        }
    }

    
    if (allCount() == 0) {
        return (
            <div className={s.root_empty}>
                <div className={s.empty_wrapper}>
                    <div className={s.empty_img}>
                        <img src={emptyImg} alt="Корзина пустая" />
                    </div>
                    <div className={s.empty_bottom}>
                        <div className={s.empty_title}>Корзина пустая!</div>
                        <div className={s.empty_description}>Перейдите на главную страницу и добавьте понравившийся товар.</div>
                    </div>
                    <div className={s.go_to_main}>
                        <Link to="/" className={s.link_to_main}><button>Выбрать пиццу</button></Link>
                    </div>
                </div>
            </div>
        )
    }else {
        return (
            <div className={s.rootCart}>
                <div className={s.titleClear}>
                    <div className={s.titleCart}>Корзина</div>
                    <div onClick={clear} className={s.clearCart}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 5H4.16667H17.5"  strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z"  strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8.33337 9.16667V14.1667"  strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M11.6666 9.16667V14.1667"  strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        <div>Очистить корзину</div>
                    </div>
                </div>
                <div>
                    {cartPizzaState.items.map((item) => <CartItemPizza key={item.id} {...item} />)}
                </div>
    
                <div>
                    {cartDrinkState.items.map((item) => <CartItemDrink key={item.id} {...item} />)}
                </div>


                {promoitem()}

                <div className={s.promocode}>
                    <div className={s.div_message}>
                        <div className={stylePromoMessage()}>{cartPromoState.promocode_message}</div>
                    </div>
                    <div className={s.div_input}>
                        <input readOnly={readOrInput()} className={stylePromoInput()} value={cartPromoState.promocode} onChange={(event) => dispatch(update_promocode(event.target.value))} placeholder='Введите промокод'/>
                    </div>

                    {promoButton()}

                </div>
    
                <div className={s.allCountAndSum}>
                    <div className={s.allCount}>
    
                        Всего: <span>{allCount()}</span> шт.
                    </div>
                    <div className={s.totalPrice}>
    
                        Сумма заказа: <span className={colorSumm()}>{summCart()} ₽</span> 
                    </div>
                </div>

                <div className={s.backAndPay}>
                    <Link style={{TextDecoration: 'none'}} to="/">
                        <button className={s.firstBtn}>
                            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <div>Вернуться назад</div>
                        </button>
                    </Link>
                    <button className={s.secondBtn}>К оформлению заказа</button>
                </div>
            </div>
        )
    }
    }



export default Cart