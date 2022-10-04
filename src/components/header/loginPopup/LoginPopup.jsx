import axios from 'axios'
import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setSingInPopupFalse, updateNumber } from './../../../redux/slices/userStateSlice'
import { getCode } from './../../../redux/slices/userStateSlice'

import s from './LoginPopup.module.scss'


function UserPopup(children) {
    const isActivePopup = useSelector((state) => state.userState.is_sing_in_active)
    const numberValue = useSelector((state) => state.userState.number)
    const can_send_code = useSelector((state) => state.userState.can_send_code)
    const dispatch = useDispatch()

    const getCo = () => {
        dispatch(getCode(numberValue))
    }

    const path = () => {}



    return (
        <div className={isActivePopup ? s.modal_active : s.modal} onClick={() => dispatch(setSingInPopupFalse())}>
            <div className={isActivePopup ? s.modal_content_active : s.modal_content} onClick={e => e.stopPropagation()}>
                <div className={isActivePopup ? s.divheader_active : s.divheader}>
                    <div className={s.maintext}>Вход на сайт</div>
                    <div className={s.description}>Cохраним адрес доставки и расскажем об акциях</div>
                </div>
                
                <div className={isActivePopup ? s.number_active : s.number}>
                    <div className={s.title}>Номер телефона</div>
                    <input className={s.inputNumber} onChange={(event) => dispatch(updateNumber(String(event.target.value)))} value={numberValue} placeholder="+7 999 999 99 99"/>
                </div>
                
                <div className={isActivePopup ? s.footer_active : s.footer}>
                    <button onClick={can_send_code ? getCo : path} className={can_send_code ? s.btn_can : s.btn}>Выслать код</button>
                </div>
            </div>
        </div>
    )
}

export default UserPopup;