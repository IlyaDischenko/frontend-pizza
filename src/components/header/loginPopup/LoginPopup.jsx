import React from 'react'

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { setSingInPopupFalse, updateNumber,  firstNumCode, secondNumCode, thirdNumCode, fourNumCode, setSendedFalse, clearCodeTitles } from './../../../redux/slices/userStateSlice'
import { getCode, confirmCode } from './../../../redux/slices/userStateSlice'

import s from './LoginPopup.module.scss'


function UserPopup(children) {
    const [ values, setValues ] = React.useState(Array(10).fill(''));
    const navigate = useNavigate();

    const isActivePopup = useSelector((state) => state.userState.is_sing_in_active)
    const numberValue = useSelector((state) => state.userState.number)
    const can_send_code = useSelector((state) => state.userState.can_send_code)
    const can_confirm_code = useSelector((state) => state.userState.can_confirm_code)
    const code_sended = useSelector((state) => state.userState.code_sended)
    const codeValue = useSelector((state) => state.userState.code)
    const code_0 = useSelector((state) => state.userState.code_0)
    const code_1 = useSelector((state) => state.userState.code_1)
    const code_2 = useSelector((state) => state.userState.code_2)
    const code_3 = useSelector((state) => state.userState.code_3)
    const isLogin = useSelector((state) => state.userState.is_login)
    const dispatch = useDispatch()

    const passForOnClick = () => {}

    const getCo = () => {
        dispatch(getCode(numberValue))
    }

    const confirmCo = () => {
        const numCod = {num: numberValue, codee: codeValue}
        dispatch(confirmCode(numCod))
        dispatch(clearCodeTitles())
    }

    const setFalse = () => {
        dispatch(setSendedFalse(false))
    }


    const numberСodeSwitch = (c) => {
        if (c == false) {
            return (<div className={isActivePopup ? s.number_active : s.number}>
                        <div className={s.title}>Номер телефона</div>
                        <input className={s.inputNumber} onChange={(event) => dispatch(updateNumber(String(event.target.value)))} value={numberValue} placeholder="+7 999 999 99 99"/>
                    </div>)
        } else if (c == true) {
            return (<div className={isActivePopup ? s.input_items_active : s.input_items}>
                        <input className={s.input_num} data-index="1" onChange={onChange} value={code_0} maxLength='1' ref={input => inputRefs[1] = input}/>
                        <input className={s.input_num} data-index="2" onChange={onChange} value={code_1} maxLength='1' ref={input => inputRefs[2] = input}/>
                        <input className={s.input_num} data-index="3" onChange={onChange} value={code_2} maxLength='1' ref={input => inputRefs[3] = input}/>
                        <input className={s.input_num} data-index="4" onChange={onChange} value={code_3} maxLength='1' ref={input => inputRefs[4] = input}/>
                    </div>)
        }
    }

    const descriptionCodeSwitch = (c) => {
        if (c == false) {
            return <div className={s.description}>Cохраним адрес доставки и расскажем об акциях</div>
        } else if (c == true) {
            return (
                <div className={s.numberTitle}>
                    Отправили сообщение с кодом на <div><span>{numberValue}</span> <span className={s.orange} onClick={setFalse}>Изменить</span></div>
                </div>
            ) 
        }
    }

    const buttonCodeSwitch = (c) => {
        if (c == false) {
            return <button onClick={can_send_code ? getCo : passForOnClick} className={can_send_code ? s.btn_can : s.btn}>Выслать код</button>
        } else if (c == true) {
            return <button onClick={can_confirm_code ? confirmCo : passForOnClick} className={can_confirm_code ? s.btn_can : s.btn}>Подтвердить код</button>
        }
    }

    const onChange = e => {
        const index = +e.target.dataset.index;
        const value = e.target.value;
        if (index == 1) {
            dispatch(firstNumCode(e.target.value))
        }else if (index == 2) {
            dispatch(secondNumCode(e.target.value))
        }else if (index == 3) {
            dispatch(thirdNumCode(e.target.value))
        }else if (index == 4) {
            dispatch(fourNumCode(e.target.value))
        }

    
        setValues(values.map((n, i) => i === index ? value : n));
    
        if (index < values.length - 1 && value) {
          inputRefs[index + 1].focus();
          inputRefs[index + 1].select();
        }
      };

    const inputRefs = [];

    React.useEffect(() => {
        if (isLogin == true) {
            dispatch(setSingInPopupFalse())
            navigate("/profile");
        }
    }, [isLogin]);

    return (
        <div className={isActivePopup ? s.modal_active : s.modal} onClick={() => dispatch(setSingInPopupFalse())}>
            <div className={isActivePopup ? s.modal_content_active : s.modal_content} onClick={e => e.stopPropagation()}>
                <div className={isActivePopup ? s.divheader_active : s.divheader}>
                    <div className={s.maintext}>Вход на сайт</div>

                    {descriptionCodeSwitch(code_sended)}
                </div>
                
                {numberСodeSwitch(code_sended)}
                
                <div className={isActivePopup ? s.footer_active : s.footer}>

                    {buttonCodeSwitch(code_sended)}
                </div>
            </div>
        </div>
    )
}

export default UserPopup;