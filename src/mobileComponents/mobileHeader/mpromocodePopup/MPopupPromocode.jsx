import React from 'react'

import s from './MPopupPromocode.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import { update_promocode, checkPromocode, clear_promocode, update_message, update_applied_status, isViewPromocodeFalse } from '../../../redux/slices/cartPromoSlice'
// import { update_promocode, checkPromocode, clear_promocode, update_message, update_applied_status } from './../../../redux/slices/cartPromoSlice'

function MPromocodePopup(  ) {
    const promo = useSelector((state) => state.promo)
    const popup = useSelector((state) => state.popup)
    const cartPromoState = useSelector((state) => state.promo)
    const cartPizzaState = useSelector((state) => state.cartPizza)
    const cartDrinkState = useSelector((state) => state.cartDrink)
    const dispatch = useDispatch()

    React.useEffect(() => {
        summCart()
    }, [promo.take_status])


    const onKeyPress = (e) => {
        if (e.key === "Enter") {
            const dataPromo = () => {
                if (popup.is_login === true){
                    return {"number": popup.number.substring(1), "promocode": cartPromoState.promocode}
                } else {
                    return {"number": "", "promocode": cartPromoState.promocode}
                }
            }
            dispatch(checkPromocode(dataPromo()))
        }
    }

    const onClickCheck = () => {
        const dataPromo = () => {
            if (popup.is_login === true){
                return {"number": popup.number.substring(1), "promocode": cartPromoState.promocode}
            } else {
                return {"number": "", "promocode": cartPromoState.promocode}
            }
        }

        dispatch(checkPromocode(dataPromo()))
    }

    const stylePromoMessage = () => {
        if (cartPromoState.applied_status === "default") {
            return s.promocode_message
        } else if (cartPromoState.applied_status === "success") {
            return s.promocode_message_success
        } else if (cartPromoState.applied_status === "error") {
            return s.promocode_message_error
        }
    }

    
    const onClickClearPromo = () => {
        dispatch(clear_promocode())
    }

    const stylePromoInput = () => {
        if (cartPromoState.take_status === "default") {
            return s.promocode_input
        } else if (cartPromoState.take_status === "success") {
            return s.promocode_input_success
        } else if (cartPromoState.take_status === "error") {
            return s.promocode_input_error
        }
    }

    const promoButton = () => {
        if (cartPromoState.take_status === "success") {
            return (                  
                    <button className={s.btn_can_t} onClick={onClickClearPromo}>Изменить</button>
                ) 
        } else if (cartPromoState.take_status !== "success") {
            return (
                    <button className={s.btn_can} onClick={onClickCheck}>Применить</button>
            )
        }
    }

    const readOrInput = () => {
        if (cartPromoState.take_status === "success") {
            return "false"
        } else if (cartPromoState.take_status !== "success") {
            return ""
        }
    }


    const summCart = () => {
        const summ = cartPizzaState.totalPrice + cartDrinkState.totalPrice 
        if (cartPromoState.type === 2) {
            if (summ >= cartPromoState.min_sum) {
                dispatch(update_message(`Скидка применена: ${cartPromoState.promocode_rub}₽`))
                dispatch(update_applied_status("success"))
            } else {
                dispatch(update_message(`Минимальная сумма заказа: ${cartPromoState.min_sum}₽`))
                dispatch(update_applied_status("default"))
            }
        } else if (cartPromoState.type === 1) {
            if (summ >= cartPromoState.min_sum) {
                dispatch(update_message(`Скидка применена: ${cartPromoState.promocode_percent}%`))
                dispatch(update_applied_status("success"))
            } else {
                dispatch(update_message(`Минимальная сумма заказа: ${cartPromoState.min_sum}₽`))
                dispatch(update_applied_status("default"))
            }
        
        } else if (cartPromoState.type === 3) {
            if (summ >= cartPromoState.min_sum) {
                dispatch(update_message(`Добавлено: ${cartPromoState.promocode_item.title}`))
                dispatch(update_applied_status("success"))
            } else {
                dispatch(update_message(`Минимальная сумма заказа: ${cartPromoState.min_sum}₽`))
                dispatch(update_applied_status("default"))
            }
        }
    }

    return (
        
            <div className={s.modal_active} onClick={() => dispatch(isViewPromocodeFalse())}>
                    <div 
                        onKeyDown={(e) => {
                        if (e.key === "Escape") {
                            dispatch(isViewPromocodeFalse())
                            }  
                        }}
                        className={s.modal_content_active} onClick={e => e.stopPropagation()}>
                        <div className={s.divheader_active}>
                            <div className={s.maintext}>Введите промокод</div>
                            <div className={s.description}>Авторизуйтесь, если промокод привязан к номеру телефона</div>
                        </div>
                 
                        <div 
                        className={s.promo_active}>
                                <div className={s.title}>Промокод</div>
                                <input className={stylePromoInput()}
                                readOnly={readOrInput()}
                                type="text"
                                onKeyDown={e => onKeyPress(e)} 
                                autoFocus={true}
                                onChange={(event) => dispatch(update_promocode(event.target.value))} 
                                value={promo.promocode} />

                                <div className={s.div_message}>
                                    <div className={stylePromoMessage()}>{cartPromoState.promocode_message}</div>
                                </div>
                        </div>

                 
                        <div className={s.footer_active}>
                        {promoButton()}
                        </div>
                    </div>
                </div>
        
    )

}

export default MPromocodePopup;