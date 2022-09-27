import React from 'react';
import { useDispatch } from 'react-redux'
import { addItem, clearItems } from '../../../../redux/slices/cartSlice';

import s from './Item_pizza.module.scss'


function ItemPizza({ id, title, description, photo, price_small, price_middle, price_big }) {
    const dispatch = useDispatch()
    
    const [activePrice, setActivePrice] = React.useState(0)
    const [activeSize, setActiveSize] = React.useState(0);
    const sizes = [26, 30, 40]
    const prices = [price_small, price_middle, price_big]

    // Выбор размера пиццы
    const onClickSizeItem = (i) => {
        setActiveSize(i)
        setActivePrice(i)
    }

    const onClickAdd = () => {
        const item = {
            id,
            title,
            photo,
            price: prices[activePrice],
            size: sizes[activeSize]
        }
        dispatch(addItem(item),
        console.log('item', item)
        )
    }

    return (
        <div className={s.item_pizza}>
            <div className={s.photo}>
                <img src={photo} alt="" />
            </div>
        
            <div className={s.title}>
                <div>{title}</div>
            </div>

            <div className={s.description}>
                <div>{description}</div>
            </div>

            <div className={s.item_footer}>

                <div className={s.sizes}>
                    <ul>
                        {sizes.map((size, i) => (
                            <li
                            key={size}
                            onClick={() => onClickSizeItem(i)}
                            className={activeSize === i ? s.active : ""}>
                            {size} см.
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={s.price_and_button}>
                    <div className={s.price}>
                        <div>от {prices[activePrice]} ₽</div>
                    </div>

                    <div className={s.button}>
                        <button onClick={onClickAdd}>Выбрать</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ItemPizza