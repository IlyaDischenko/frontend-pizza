import React from 'react'

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import { isViewTrue } from './../../redux/slices/PopupStateSliceFolder/popupSlise'
import { isViewPromocodeTrue } from './../../redux/slices/cartPromoSlice'
import { getUserInfo } from '../../redux/slices/UserStateSliceFolder/userAsyncThunk';

import Popup from './loginPopup/PopupLogin'
import PromocodePopup from './promocodePopup/PopupPromocode'
import s from './Header.module.scss'
import logo from '../../img/logo.svg'
import discount from '../../img/discount.png'

function Header() {
    const cartPizza = useSelector((state) => state.cartPizza)
    const cartDrink = useSelector((state) => state.cartDrink)
    const cartPromo = useSelector((state) => state.promo)
    const popup = useSelector((state) => state.popup)

    const isActive = useSelector((state) => state.popup.isPopupActive)
    const codeSended = useSelector((state) => state.popup.code_sended)

    const dispatch = useDispatch()

    const [scroll, setScroll] = React.useState(0)


    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    const allCount = () => {
        if (cartPromo.type === 3) {
            return cartPizza.countItems + cartDrink.countItems + 1
        } else {
            return cartPizza.countItems + cartDrink.countItems
        } 
    } 

    const cartCount = () => {
        if (allCount() === 0) {
             return <span></span>
        } else {
            return <div className={s.countItem}>
                    <div className={s.delimiter}></div>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path><path d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path><path d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    <div>{allCount()}</div>
                </div>
        }
    }

    const handleScroll = () => {
        setScroll(window.scrollY);
    }
    
    const isLoginTitle = () => {
        if (popup.is_login === true) {
            return "Кабинет"
        } else if (popup.is_login === false) {
            return "Вход"
        }
    }

    const linkToOrPopup = (is) => {
        if (is === false) {
            return (
                <div onClick={() => dispatch(isViewTrue())} className={s.item}>
                    <span fill="none" className={s.icon}>
                        <svg width="20" height="28" viewBox="0 0 23 28" fill="none" className={s.iconimg} xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.5 11.8182C14.2469 11.8182 16.4737 9.62031 16.4737 6.90909C16.4737 4.19787 14.2469 2 11.5 2C8.7531 2 6.52631 4.19787 6.52631 6.90909C6.52631 9.62031 8.7531 11.8182 11.5 11.8182Z" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M13.203 17.2727H9.79698C5.12844 17.2727 1.5187 21.3685 2.10526 26H20.8947C21.4813 21.3685 17.8716 17.2727 13.203 17.2727Z" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </span>
                    <div className={s.text}>{isLoginTitle()}</div>
                </div>
            )
        } else if (is === true) {
            return (
                <Link to="/profile">
                    <div className={s.item}>
                        <span fill="none" className={s.icon}>
                            <svg width="20" height="28" viewBox="0 0 23 28" fill="none" className={s.iconimg} xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.5 11.8182C14.2469 11.8182 16.4737 9.62031 16.4737 6.90909C16.4737 4.19787 14.2469 2 11.5 2C8.7531 2 6.52631 4.19787 6.52631 6.90909C6.52631 9.62031 8.7531 11.8182 11.5 11.8182Z" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M13.203 17.2727H9.79698C5.12844 17.2727 1.5187 21.3685 2.10526 26H20.8947C21.4813 21.3685 17.8716 17.2727 13.203 17.2727Z" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                        <div className={s.text}> {isLoginTitle()} </div>
                    </div>
                </Link>
            )
        }
    }



    return (
        <header className={s.Header}>
            <div className={scroll <= 40 ? s.header_inner : s.header_inner_scroll}>
                <div className={s.header_items}>
                    <Link to="/">
                        <div className={s.left_items}>
                            <img src={logo} alt="Логотип" />
                        </div>
                    </Link>
                    <div className={s.right_items}>
                        
                        <div>
                            <div className={s.number_text}> +7 999 669 16-29</div>
                        </div>
                        

                        <div onClick={() => dispatch(isViewPromocodeTrue())} className={s.item}>
                            <div className={s.icon}>
                                <img src={discount} alt='Промокод' />
                            </div>
                            <div className={s.text}>Промокод</div>
                        </div>
                        {linkToOrPopup(popup.is_login)}
                        <Link to="/cart">
                            <div className={s.divbutton}>
                                <button>
                                    <div className={s.but}>
                                        <span>Корзина</span>
                                        {cartCount()}
                                    </div>
                                </button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            {isActive && <Popup isView={popup.isPopupActive} codeSend={codeSended}/>}
            {cartPromo.isPopupPromocodeActive && <PromocodePopup isView={popup.isPopupActive} codeSend={codeSended}/>}
        </header>
    )
}

export default Header;