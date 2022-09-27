import s from './CartItem.module.scss'


function CartItem({ title, photo, size, countItem, price  }) {

    return (
        <div className={s.rootCartItem}>
            <div className={s.img}>
                <img src={photo}></img>
            </div>
            <div className={s.titleAndSize}>
                <div className={s.title}>{title}</div>
                <div className={s.size}>{size}</div>
            </div>
            <div className={s.count}>
                <button>-</button>
                <div>{countItem}</div>
                <button>-</button>
            </div>
            <div className={s.price}>{price}</div>
            <div className={s.removeItem}>
                <button>x</button>
            </div>
        </div>
    )
}

export default CartItem