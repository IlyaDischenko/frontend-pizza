import { useDispatch, useSelector } from 'react-redux'

import s from './../components/cart/Cart.module.scss'
import CartItem from './../components/cart/cartItem/CartItem'
import { addItem, clearItems } from './../redux/slices/cartSlice';

function Cart() {
    const cartState = useSelector((state) => state.cart.items)
    console.log(cartState)

    const dispatch = useDispatch()

    const clear = () => {
        dispatch(clearItems())
    }

    return (
        <div className={s.rootCart}>
            <div className={s.titleClear}>
                <div className={s.titleCart}>Корзина</div>
                <div onClick={clear} className={s.clearCart}>Очистить корзину</div>
                {/* <div className={s.clearCart}>{cartState}</div> */}
            </div>
            <div className={s.cartItems}>
                <CartItem />
            </div>
            <div className={s.footerCart}>
                <div className={s.countPizzas}></div>
                <div className={s.totalPrice}></div>
            </div>
            <div className={s.backAndPay}>
                <button>Вернуться назад</button>
                <button>К оформлению заказа</button>
            </div>
        </div>
    )
}

export default Cart