import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../../../../redux/slices/cartPizzaSlice';

import s from './MItemPizza.module.scss'


function ItemPizza({ id, title, description, photo, price_small, price_middle, price_big }) {
    const dispatch = useDispatch()
    // Ищем добавленные пиццы по размерам
    const bigItemState = useSelector((state) => state.cartPizza.items.find((obj) => obj.id == id && obj.size == 35))
    const middleItemState = useSelector((state) => state.cartPizza.items.find((obj) => obj.id == id && obj.size == 30))
    const smallItemState = useSelector((state) => state.cartPizza.items.find((obj) => obj.id == id && obj.size == 25))

    const bigAddedCount = bigItemState ? bigItemState.count : 0
    const middleAddedCount = middleItemState ? middleItemState.count : 0
    const smallAddedCount = smallItemState ? smallItemState.count : 0

    
    const [activePrice, setActivePrice] = React.useState(0)
    const [activeSize, setActiveSize] = React.useState(0) 
    const [isViewSizes, setIsViewSizes] = React.useState(false)
    const sizes = [25, 30, 35]
    const prices = [price_small, price_middle, price_big]

    // Выбор размера пиццы
    const onClickSizeItem = (i) => {
        setActiveSize(i)
        setActivePrice(i)
    }

    // const notify = () => toast.success(`Добавлено: ${title} ${sizes[activeSize]} см`, {
    //     position: "bottom-left",
    //     autoClose: 2000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //     })

    const onClickAdd = () => {
        if (!isViewSizes) {
            setIsViewSizes(true)
        } else {
            // notify()
            const item = {
                id,
                title,
                photo,
                price: prices[activePrice],
                size: sizes[activeSize]
            }
            dispatch(addItem(item),
            )
        }
    }

    const checkSize = (indexSize) => {
        if (indexSize == 0) {
            if (smallAddedCount > 0) {
                return <div>
                           <div className={s.delimiter}></div>
                           <div>{smallAddedCount}</div>
                       </div>
            }
            
        } else if (indexSize == 1) {
            if (middleAddedCount > 0) {
                return <div>
                           <div className={s.delimiter}></div>
                           <div>{middleAddedCount}</div>
                       </div>
            }
        }else if (indexSize == 2) {
            if (bigAddedCount > 0) {
                return <div>
                           <div className={s.delimiter}></div>
                           <div>{bigAddedCount}</div>
                       </div>
            }
        }
    }

    const allCountItem = () => {
        const allcount = bigAddedCount + middleAddedCount + smallAddedCount
        if (allcount > 0) {
            return <div className={s.countDiv}>
                <div className={s.delimiter}></div>
                <div>{allcount}</div>
            </div>
        }
    }

    return (
        <div className={s.item_pizza}>
            <div className={s.photo}>
                <img src={photo} alt="" />
            </div>

            <div className={s.right_elements}>
                <div className={s.title}>
                    <div>{title}</div>
                </div>

                <div className={s.description}>
                    <div>{description}</div>
                </div>

                <div className={s.item_footer}>


                {isViewSizes ? 
                    <div className={s.sizes}>
                        <ul>
                        {sizes.map((size, i) => (
                            <li
                            key={size}
                            onClick={() => onClickSizeItem(i)}
                            className={activeSize === i ? s.active : ""}>
                            {size} см 
                            {checkSize(i)}
                            </li>
                        ))}
                        </ul>
                    </div>: "" 
                } 

                    <div className={s.price_and_button}>
                        <div className={s.button}>
                            <button onClick={onClickAdd}>
                            <span>Выбрать</span>
                            {allCountItem()}
                            </button>
                        </div>
                        
                        <div className={s.price}>
                            <div>от {prices[activePrice]} ₽</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <ToastContainer 
                        position="bottom-left"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss={false}
                        draggable
                        pauseOnHover
                        theme="dark"
                        /> */}
        </div>
    )
}


export default ItemPizza