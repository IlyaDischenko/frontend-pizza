import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';


import s from './MCart.module.scss'
import MCartItemPizza from './MCartItemPizza/MCartItemPizza'
import MCartItemDrink from './MCartItemDrink/MCartItemDrink'
import MCartItemPromo from './MCartItemPromo/MCartItemPromo'
import { clearPizzaItems } from './../../redux/slices/cartPizzaSlice'
import { clearDrinkItems } from './../../redux/slices/cartDrinkSlice'
import { update_promocode, checkPromocode, clear_promocode, update_message, update_applied_status } from './../../redux/slices/cartPromoSlice'
import MobileHeader from '../mobileHeader/MobileHeader';


// import emptyImg from './../img/emptyCart.png'

function MCart() {
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
            return false
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
        if (cartPromoState.type == 3 && summ > cartPromoState.min_sum) {
            return cartPizzaState.countItems + cartDrinkState.countItems + 1
        } else return cartPizzaState.countItems + cartDrinkState.countItems
    } 

    const promoitem = () => {
        if (cartPromoState.promocode_item.length == 0) {
            return <></>
        } else {
            return (
                <MCartItemPromo data={cartPromoState.promocode_item} />
            )
        }
    }

    const title = () => {
        if (allCount() != 0 ) {
            if (allCount() == 1) {
                return  <div className={s.titleCart}>{`1 товар на ${summCart()}₽`}</div>
            } else if (allCount() > 1 && allCount() < 5) {
                return <div className={s.titleCart}>{`${allCount()} товара на ${summCart()}₽`}</div>
            } else if (allCount() >= 5) {
                return <div className={s.titleCart}>{`${allCount()} товара на ${summCart()}₽`}</div>
            }
        } else {
            return <div className={s.titleCart}>В корзине нет товаров</div>
        }
    }

    
    if (allCount() == 0) {
        return (
            <main>
            <MobileHeader /> 
            <div className={s.root_empty}>
                <div className={s.empty_wrapper}>
                    <div className={s.empty_img}>
                        {/* <img src={emptyImg} alt="Корзина пустая" /> */}
                    </div>
                    <div className={s.empty_bottom}>
                        <div className={s.empty_title}>Корзина пустая!</div>
                        <div className={s.empty_description}>Перейдите на главную страницу и добавьте понравившийся товар.</div>
                    </div>
                </div>
            </div>
            </main>
        )
    }else {
        return (
            <main>
            <MobileHeader />
            <div className={s.rootCart}>
                <div className={s.titleClear}>
                    {title()}
                </div>
                
                {cartPizzaState.items.map((item) => <MCartItemPizza key={item.id} {...item} />)}
    
                {cartDrinkState.items.map((item) => <MCartItemDrink key={item.id} {...item} />)}


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
            </main>
        )
    }
}



export default MCart