import React from 'react'

import s from './MLogin.module.scss'

import { Link } from 'react-router-dom';
import { useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { isViewFalse, updateNumber, firstNumCode, secondNumCode, thirdNumCode, fourNumCode, setSendedFalse, clearCodeTitles } from './../../redux/slices/PopupStateSliceFolder/popupSlise'
import { getCodeAction, confirmCode } from './../../redux/slices/PopupStateSliceFolder/popupAsyncThunk'
import { getUserInfo } from './../../redux/slices/UserStateSliceFolder/userAsyncThunk'

function MLogin() {
    const popup = useSelector((state) => state.popup)
    const user = useSelector((state) => state.user)
    const codeSend = popup.code_sended
    const dispatch = useDispatch()
    const passForOnClick = () => {}


    const [ values, setValues ] = React.useState(Array(10).fill(''));
    const navigate = useNavigate()
 
    

    React.useEffect(() => {
        if (popup.is_login == true) {
            const userToken = {"token": popup.token}
            dispatch(isViewFalse())
            dispatch(getUserInfo(userToken))
            navigate(user.url)
        }
    }, [popup.is_login])


    const getCo = () => {
        const num = {"number": popup.number,}
        dispatch(getCodeAction(num))
    }

    const confirmCo = () => {
        const numCod = {num: popup.number, codee: popup.code}
        dispatch(confirmCode(numCod))
        dispatch(clearCodeTitles())
    }

    const onKeyConfirm = (e) => {
        if (e.key === "Enter") {
            confirmCo()
        }
    }

    const onKeySend = (e) => {
        if (e.key === "Enter") {
            if (popup.can_send_code){
                getCo()
            }
        }
    }

    const checkCode = () => {
        if (popup.is_login_status == "default") {
            return s.input_num
        } else if (popup.is_login_status == "error") {
            return s.error_input_num
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
          inputRefs[index + 1].focus()
          inputRefs[index + 1].select()
        }
    }

    const inputRefs = [];

    const setSendetFalse = () => dispatch(setSendedFalse(false))



    const returnCom = (c) => {
        if (!c) {
            return (
                <div className={s.number} onClick={() => dispatch(isViewFalse())}>
                    <div 
                        onKeyDown={(e) => {
                        if (e.key === "Escape") {
                            dispatch(isViewFalse())
                            }  
                        }}
                        className={s.number_content} onClick={e => e.stopPropagation()}>
                        
                        <div className={s.divheader}>
                            <div className={s.maintext}>???????? ???? ????????</div>
                            <div className={s.description}>C?????????????? ?????????? ???????????????? ?? ?????????????????? ???? ????????????</div>
                        </div>
                 
                        <div 
                        className={s.number_active}>
                                <div className={s.title}>?????????? ????????????????</div>
                                <input className={s.inputNumber}
                                onKeyDown={e => onKeySend(e)} 
                                autoFocus={true}
                                onChange={(event) => dispatch(updateNumber(String(event.target.value)))} 
                                inputMode="numeric"
                                value={popup.number} />
                        </div>
                 
                        <div className={s.footer_active}>
                        <button onClick={popup.can_send_code ? getCo : passForOnClick} className={popup.can_send_code ? s.btn_can : s.btn}>?????????????? ??????</button>
                        </div>
                    </div>
                </div>
            )
        } else if (c) {
            return (
                <div className={s.confirm} onClick={() => dispatch(isViewFalse())}>
                    <div 
                        className={s.confirm_content} onClick={e => e.stopPropagation()}>
                        <div className={s.divheader}>
                            <div className={s.maintext}>???????? ???? ????????</div>
                            <div className={s.numberTitle}>
                                ???????????? ???????????????? ???? <div><span>{popup.number}</span> <span className={s.orange} onClick={setSendetFalse}>????????????????</span></div>
                            </div>
                        </div>
                        
                        <div onKeyDown={e => onKeyConfirm(e)} className={s.input_items_active}>
                        
                            <input autoFocus={true} className={checkCode()} data-index="1" inputMode="numeric" onChange={onChange} value={popup.code_0} maxLength='1' ref={input => inputRefs[1] = input}/>
                            <input className={checkCode()} data-index="2" inputMode="numeric" onChange={onChange} value={popup.code_1} maxLength='1' ref={input => inputRefs[2] = input}/>
                            <input className={checkCode()} data-index="3" inputMode="numeric" onChange={onChange} value={popup.code_2} maxLength='1' ref={input => inputRefs[3] = input}/>
                            <input className={checkCode()} data-index="4" inputMode="numeric" onChange={onChange} value={popup.code_3} maxLength='1' ref={input => inputRefs[4] = input}/>
                        </div>
                        
                        <div className={s.footer_active}>
        
                        <button onClick={popup.can_confirm_code ? confirmCo : passForOnClick} className={popup.can_confirm_code ? s.btn_can : s.btn}>?????????????????????? ??????</button>
                        </div>
                    </div>
                </div>
            )
        } 
    }

    return (
        
        <div className={s.wrp}>
            <Link to="/">
                <button className={s.backButton}>
                    <svg width="16" height="22" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 6.93015L6.86175 1" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    ??????????
                </button>
            </Link>
            {returnCom(codeSend)}
        </div>
    )

}

export default MLogin;