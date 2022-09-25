import React from 'react';

import s from './Item_pizza.module.scss'


function ItemPizza({ title, description, photo, price_small, price_middle, price_big }) {
    
    const [activeSize, setActiveSize] = React.useState(0);
    const sizes = [26, 30, 40]

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
                            onClick={() => setActiveSize(i)}
                            className={activeSize === i ? s.active : ""}>
                            {size} см.
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={s.price_and_button}>
                    <div className={s.price}>
                        <div>от {price_small} ₽</div>
                    </div>

                    <div className={s.button}>
                        <button>Выбрать</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// function ItemPizza({ title, description, photo, price_small }) {
//     const types = ['Тонкое', 'Традиционное']
//     const sizes = [26, 30, 40]

//     return (
//     <div className="pizza-block-wrapper">
//     <div className="pizza-block">
//     <Link key={id} to={`/pizza/${id}`}>
//         <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
//         <h4 className="pizza-block__title">{title}</h4>
//     </Link>
//     <div className="pizza-block__selector">
//         <ul>
//         {types.map((typeId) => (
//             <li
//             key={typeId}
//             className={s.active}>
//             </li>
//         ))}
//         </ul>
//         <ul>
//         {sizes.map((size, i) => (
//             <li
//             key={size}
//             className={s.active}>
//             {size} см.
//             </li>
//         ))}
//         </ul>
//     </div>
//     <div className="pizza-block__bottom">
//         <div className="pizza-block__price">от {price} ₽</div>
//         <button onClick={onClickAdd} className="button button--outline button--add">
//         <svg
//             width="12"
//             height="12"
//             viewBox="0 0 12 12"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg">
//             <path
//             d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
//             fill="white"
//             />
//         </svg>
//         <span>Добавить</span>
//         {addedCount > 0 && <i>{addedCount}</i>}
//         </button>
//     </div>
//     </div>
//     </div>
// }


export default ItemPizza