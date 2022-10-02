import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import s from './../components/cart/Cart.module.scss'
import CartItemPizza from '../components/cart/CartItemPizza/CartItemPizza'
import CartItemDrink from '../components/cart/CartItemDrink/CartItemDrink'
import { clearPizzaItems } from './../redux/slices/cartPizzaSlice'
import { clearDrinkItems } from './../redux/slices/cartDrinkSlice'

function Cart() {
    const cartPizzaState = useSelector((state) => state.cartPizza)
    const cartDrinkState = useSelector((state) => state.cartDrink)

    const dispatch = useDispatch()

    const clear = () => {
        dispatch(clearPizzaItems())
        dispatch(clearDrinkItems())
    }

    const summ = () => {
        return cartPizzaState.totalPrice + cartDrinkState.totalPrice
    }

    const allCount = () => {
        return cartPizzaState.countItems + cartDrinkState.countItems
    }

    return (
        <div className={s.rootCart}>
            <div className={s.titleClear}>
                <div className={s.titleCart}>Корзина</div>
                <div onClick={clear} className={s.clearCart}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 5H4.16667H17.5"  strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z"  strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8.33337 9.16667V14.1667"  strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M11.6666 9.16667V14.1667"  strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    <div>Очистить корзину</div>
                </div>
            </div>
            <div>
                {cartPizzaState.items.map((item) => <CartItemPizza key={item.id} {...item} />)}
            </div>

            <div>
                {cartDrinkState.items.map((item) => <CartItemDrink key={item.id} {...item} />)}
            </div>

            <div className={s.allCountAndSum}>
                <div className={s.allCount}>
                     {/* сделать правильный расчёт, не только пиццы!!!! */}
                    Всего: <span>{allCount()}</span> шт.
                </div>
                <div className={s.totalPrice}>
                    {/* сделать правильный расчёт, не только пиццы!!!! */}
                    Сумма заказа: <span>{summ()} ₽</span> 
                </div>
            </div>

            <div className={s.backAndPay}>
                <Link style={{TextDecoration: 'none'}} to="/">
                    <button className={s.firstBtn}>
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        <div>Вернуться назад</div>
                    </button>
                </Link>
                <button className={s.secondBtn}>К оформлению заказа</button>
            </div>
        </div>
    )
}

export default Cart