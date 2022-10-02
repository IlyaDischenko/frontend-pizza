import { useDispatch } from 'react-redux'

import s from './CartItemDrink.module.scss'
import { addDrinkItem, itemDrinkMinus, removeDrinkItem } from '../../../redux/slices/cartDrinkSlice';


function CartDrinkItem({ id, photo, title, size, count, allItemPrice }) {
    const dispatch = useDispatch()

    const itemDecrement = () => {
        if (count > 1) {
            dispatch(itemDrinkMinus({id, size}))
        }
    }

    const itemIncrement = () => {
        dispatch(addDrinkItem({id, size}))
    }

    const rmItem = () => {
        dispatch(removeDrinkItem({id, size}))
    }

    return (
        <div className={s.rootCartItem}>
            <div className={s.photoAndTitle}>
                <div className={s.img}>
                    <img src={photo}></img>
                </div>
                <div className={s.titleAndSize}>
                    <div className={s.title}>{title}</div>
                </div>
            </div>
            <div className={s.rightItems}>
                <div className={s.count}>
                    <button onClick={itemDecrement} className={ count > 1 ? s.btn : s.btnMinusOne}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"></path></svg>    
                    </button>
                    <div>{count}</div>
                    <button onClick={itemIncrement} className={s.btn}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"></path><path d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"></path></svg>
                    </button>
                </div>
                <div className={s.priceAndRemove}>
                    <div className={s.price}>{allItemPrice} ₽</div> 
                    <div onClick={rmItem} className={s.removeItem}>
                        <button>
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z" fill="#EB5A1E"></path><path d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartDrinkItem