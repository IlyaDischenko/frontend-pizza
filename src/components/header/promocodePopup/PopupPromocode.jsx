import React from 'react'

import s from './PopupPromocode.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import { update_promocode, checkPromocode, clear_promocode, update_message, update_applied_status, isViewPromocodeFalse } from './../../../redux/slices/cartPromoSlice'
// import { update_promocode, checkPromocode, clear_promocode, update_message, update_applied_status } from './../../../redux/slices/cartPromoSlice'

function PromocodePopup(  ) {
    const promo = useSelector((state) => state.promo)
    const popup = useSelector((state) => state.popup)
    const cartPromoState = useSelector((state) => state.promo)
    const dispatch = useDispatch()
    // const passForOnClick = () => {}


    // React.useEffect(() => {
    //     if (popup.is_login == true) {
    //         const userToken = {"token": popup.token}
    //         dispatch(isViewFalse())
    //         dispatch(getUserInfo(userToken))
    //     }
    // }, [popup.is_login])

    // const getCo = () => {
    //     const num = {"number": popup.number,}
    //     dispatch(getCodeAction(num))
    // }

    const onKeyPress = (e) => {
        if (e.key === "Enter") {
            alert(promo.promocode)
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
                    <button className={s.btn_can} onClick={onClickClearPromo}>Изменить</button>
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

export default PromocodePopup;