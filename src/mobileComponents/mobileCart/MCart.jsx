import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';


import s from './MCart.module.scss'
import MCartItemPizza from './MCartItemPizza/MCartItemPizza'
import MCartItemDrink from './MCartItemDrink/MCartItemDrink'
import MCartItemPromo from './MCartItemPromo/MCartItemPromo'
import { clearPizzaItems } from './../../redux/slices/cartPizzaSlice'
import { clearDrinkItems } from './../../redux/slices/cartDrinkSlice'
import { setUrl } from '../../redux/slices/UserStateSliceFolder/userSlice';
import { update_promocode, checkPromocode, clear_promocode, update_message, update_applied_status } from './../../redux/slices/cartPromoSlice'
import MobileHeader from '../mobileHeader/MobileHeader';
import { changeCount, changeSum } from '../../redux/slices/orderStateSliceFolder/orderSlise';


function MCart() {
    const cartPizzaState = useSelector((state) => state.cartPizza)
    const cartDrinkState = useSelector((state) => state.cartDrink)
    const cartPromoState = useSelector((state) => state.promo)
    const popup = useSelector((state) => state.popup)
    // const order = useSelector((state) => state.order)


    const dispatch = useDispatch()


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
                dispatch(changeSum(summ - cartPromoState.promocode_rub))
                // 
                // 
                // 
                return summ - cartPromoState.promocode_rub
            } else {
                dispatch(update_message(`Минимальная сумма заказа: ${cartPromoState.min_sum}₽`))
                dispatch(update_applied_status("default"))
                dispatch(changeSum(summ))
                return summ
            }
            
        } else if (cartPromoState.type == 1) {
            if (summ >= cartPromoState.min_sum) {
                dispatch(update_message(`Скидка применена: ${cartPromoState.promocode_percent}%`))
                dispatch(update_applied_status("success"))
                dispatch(changeSum(Math.trunc((summ / 100) * (100 - cartPromoState.promocode_percent))))
                return Math.trunc((summ / 100) * (100 - cartPromoState.promocode_percent))
            } else {
                dispatch(update_message(`Минимальная сумма заказа: ${cartPromoState.min_sum}₽`))
                dispatch(update_applied_status("default"))
                dispatch(changeSum(summ))
                return summ
            }
        
        } else if (cartPromoState.type == 3) {
            if (summ >= cartPromoState.min_sum) {
                dispatch(update_message(`Добавлено: ${cartPromoState.promocode_item.title}`))
                dispatch(update_applied_status("success"))
                dispatch(changeSum(summ + cartPromoState.item_price))
                return summ + cartPromoState.item_price
            } else {
                dispatch(update_message(`Минимальная сумма заказа: ${cartPromoState.min_sum}₽`))
                dispatch(update_applied_status("default"))
                dispatch(changeSum(summ))
                return summ
            }
        
        }else {
            dispatch(changeSum(summ))
            return summ
        }
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
                <MCartItemPromo data={cartPromoState.promocode_item} />
            )
        }
    }

    const title = () => {
        if (allCount() != 0 ) {
            if (allCount() == 1) {
                dispatch(changeCount('1 товар'))
                return  '1 товар'
            } else if (allCount() > 1 && allCount() < 5) {
                dispatch(changeCount(`${allCount()} товара`))
                return `${allCount()} товара`
            } else if (allCount() >= 5) {
                dispatch(changeCount(`${allCount()} товаров`))
                return `${allCount()} товаров`
            }
        } else {
            dispatch(changeCount('В корзине нет товаров'))
            return <div className={s.titleCart}>В корзине нет товаров</div>
        }
    }

    const linkOrderBtn = () => {
        if (!popup.is_login) {
            return "/login"
        } else if (popup.is_login) {
            return "/order"
        } 
    }
    
    if (allCount() == 0) {
        return (
            <main>
            <MobileHeader />
            <div className={s.root_empty}>
                <div className={s.empty_wrapper}>
                    <div className={s.empty_bottom}>
                        <div className={s.empty_title}>Корзина пустая!</div>
                        <div className={s.empty_description}>Перейдите на главную страницу и добавьте понравившийся товар.</div>
                        <Link to="/" className={s.link_to_main}><button>Выбрать пиццу</button></Link>
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
                    <div className={s.titleCart}>{title()} на {summCart()} ₽</div>
                    
                </div>
                
                {cartPizzaState.items.map((item) => <MCartItemPizza key={item.uuid} {...item} />)}
    
                {cartDrinkState.items.map((item) => <MCartItemDrink key={item.id} {...item} />)}


                {promoitem()}

                <div className={s.promocode}>
                    <div className={s.forborder}>
                        <div className={s.top_element}>
                            <div className={s.div_input}>
                                <input readOnly={readOrInput()} className={s.promocode_input} value={cartPromoState.promocode} onChange={(event) => dispatch(update_promocode(event.target.value))} placeholder='Введите промокод'/>
                            </div>
            
                            {promoButton()}
                        </div>
                        <div className={s.div_message}>
                            <div className={stylePromoMessage()}>{cartPromoState.promocode_message}</div>
                        </div>
                    </div>
                </div>
    
                <div className={s.allInfo}>
                    
                    <div className={s.allCount}>
                        <span>{title()}</span>
                        <span className={colorSumm()}>{summCart()} ₽</span> 
                    </div>

                    <div className={s.deliver}>
                        <span>Доставка</span> 
                        <span>Бесплатно</span> 
                    </div>
                </div>

                <div className={s.bottom_sum}>
                    <div className={s.allSum}>
                        <span>Сумма заказа</span> 
                        <span>{summCart()} ₽</span> 
                    </div>
                </div>

                <div className={s.topaybtn}>
                    <Link className={s.linkBtn} to={linkOrderBtn()} onClick={() => dispatch(setUrl("/order"))}>
                        <button>К оформлению заказа</button>
                    </Link>
                </div>
            </div>
            </main>
        )
    }
}



export default MCart