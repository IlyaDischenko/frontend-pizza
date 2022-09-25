import React from 'react';

import s from './Item_pizza.module.scss'


function ItemPizza({ title, description, photo, price_small, price_middle, price_big }) {
    const [activePrice, setActivePrice] = React.useState(0)
    const [activeSize, setActiveSize] = React.useState(0);
    const sizes = [26, 30, 40]
    const prices = [price_small, price_middle, price_big]

    const onClickSizeItem = (i) => {
        setActiveSize(i)
        setActivePrice(i)
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
                        <button>Выбрать</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ItemPizza