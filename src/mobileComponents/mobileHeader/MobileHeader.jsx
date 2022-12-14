import React from 'react'

import { useDispatch, useSelector } from 'react-redux';

import MPromocodePopup from './mpromocodePopup/MPopupPromocode';

import { setUrl } from '../../redux/slices/UserStateSliceFolder/userSlice';
import { isViewPromocodeTrue, isViewPromocodeFalse } from '../../redux/slices/cartPromoSlice';

import { Link } from 'react-router-dom';
import logo from './../../img/logo.svg'
import s from './MobileHeader.module.scss'
import discount from '../../img/discount.png'

function MobileHeader() {
  const cartPromo = useSelector((state) => state.promo)
  const popup = useSelector((state) => state.popup)

  const isActive = useSelector((state) => state.popup.isPopupActive)
  const codeSended = useSelector((state) => state.popup.code_sended)

  const dispatch = useDispatch()

  const isLoginTitle = () => {
    if (popup.is_login == true) {
        return "Кабинет"
    } else if (popup.is_login == false) {
        return "Вход"
    }
  }


  return (
      <header className={s.Header}>
        <div className={s.header_inner_scroll}>
          <div className={s.header_items}>
            <Link to="/">
              <div className={s.header_img}>
                <img src={logo} alt="Логотип" />
              </div>
            </Link>

            <div className={s.right_elements}>
              <div onClick={() => dispatch(isViewPromocodeTrue())} className={s.item}>
                  <div className={s.icon}>
                      <img src={discount} alt='Промокод' />
                  </div>
                  <div className={s.text}>Промокод</div>
              </div>


              <Link to={popup.is_login ? "/profile" : "/login"}>
                <div className={s.item}>
                  <span fill="none" className={s.icon}>
                      <svg width="14" height="22" viewBox="0 0 23 28" fill="none" className={s.iconimg} xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.5 11.8182C14.2469 11.8182 16.4737 9.62031 16.4737 6.90909C16.4737 4.19787 14.2469 2 11.5 2C8.7531 2 6.52631 4.19787 6.52631 6.90909C6.52631 9.62031 8.7531 11.8182 11.5 11.8182Z" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M13.203 17.2727H9.79698C5.12844 17.2727 1.5187 21.3685 2.10526 26H20.8947C21.4813 21.3685 17.8716 17.2727 13.203 17.2727Z" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                  </span>
                  <div className={s.text}>{isLoginTitle()}</div>
                </div>
              </Link> 
            </div>
          </div>
        </div> 
        {cartPromo.isPopupPromocodeActive && <MPromocodePopup isView={popup.isPopupActive} codeSend={codeSended}/>}
      </header>
    )
  }
  
export default MobileHeader;