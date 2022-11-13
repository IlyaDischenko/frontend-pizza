import React from 'react'

import s from './PopupPromocode.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import { update_promocode, isViewPromocodeFalse } from './../../../redux/slices/cartPromoSlice'

function PromocodePopup(  ) {
    const promo = useSelector((state) => state.promo)
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
                                <input className={s.inputPromo}
                                type="text"
                                onKeyDown={e => onKeyPress(e)} 
                                autoFocus={true}
                                onChange={(event) => dispatch(update_promocode(event.target.value))} 
                                value={promo.promocode} />
                        </div>
                 
                        <div className={s.footer_active}>
                        <button onClick={() => alert(promo.promocode)} className={s.btn_can}>Применить промокод</button>
                        </div>
                    </div>
                </div>
        
    )

}

export default PromocodePopup;