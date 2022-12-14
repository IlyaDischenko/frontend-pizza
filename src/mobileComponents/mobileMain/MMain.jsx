import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { fetchItems } from '../../redux/slices/ItemStateSliceFolder/ItemsSlice'

import MPizza from './mPizza/MPizza'
import s from './MMain.module.scss'
import MDrink from './mDrink/MDrink'
import MHeader from '../mobileHeader/MobileHeader'
import { Link } from 'react-router-dom'

function Main() {
    const cartPizzaState = useSelector((state) => state.cartPizza)
    const cartDrinkState = useSelector((state) => state.cartDrink)
    const cartPromoState = useSelector((state) => state.promo)
    const dispatch = useDispatch()

    const getItems = async () => {
        dispatch(fetchItems())
    }
    React.useEffect(() => {
        getItems()
    },[])


    const count = () => {
        if (cartPromoState.type === 3) {
            return cartPizzaState.countItems + cartDrinkState.countItems + 1
        } else return cartPizzaState.countItems + cartDrinkState.countItems
    } 

    const cartButton = () => {
        if (count() === 0) {
            return <></>
        } else {
            return (
                <Link to="/cart">
                    <div className={s.cart}>
                        <div className={s.cart_button}>
                            <div className={s.cart_img}><svg width="28" height="28" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z" stroke="#f85d2d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path><path d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z" stroke="#f85d2d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path><path d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669" stroke="#f85d2d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg></div>
                            <div className={s.cart_count}>
                                <div>{count()}</div>
                            </div>
                        </div>
                    </div>
                </Link>
            )
        }
    }

    return (
        <>
            <MHeader />
            {/* <Link to='/myorder'>
                <button>myorder</button>
            </Link> */}
            <main className={s.main}>
                <MPizza />
                <MDrink />
                {cartButton()}
            </main>
        </>
    )
}

export default Main