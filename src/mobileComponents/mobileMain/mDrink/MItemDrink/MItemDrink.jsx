import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux'
import { addDrinkItem } from '../../../../redux/slices/cartDrinkSlice';

import s from './MItemDrink.module.scss'


function ItemPizza({ id, title, description, photo, price }) {
    const dispatch = useDispatch()
    // Ищем добавленные напитки
    const ItemState = useSelector((state) => state.cartDrink.items.find((obj) => obj.id == id))

    const AddedCount = ItemState ? ItemState.count : 0
    // const haveDescription = ItemState ? ItemState.description : false

    // const notify = () => toast.success(`Добавлено: ${title}`, {
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
        // notify()
        const item = {
            id,
            title,
            photo,
            price,
        }
        dispatch(addDrinkItem(item))
    }

    const allCountItem = () => {
        if (AddedCount > 0) {
            return <div className={s.countDiv}>
                <div className={s.delimiter}></div>
                <div>{AddedCount}</div>
            </div>
        }
    }

    const isDescription = () => {
        if (description != 'None') {
            return <div className={s.description}>
                <div>{description}</div>
            </div>
        } else return <span></span>
    }

    return (
        <div className={s.itemDrink}>
            <div className={s.photo}>
                <img src={photo} alt="" />
            </div>


            <div className={s.right_elements}>
                <div className={s.title}>
                    <div>{title}</div>
                </div>


                {isDescription()}

                <div className={s.item_footer}>

                    <div className={s.price_and_button}>
                        <div className={s.button}>
                            <button onClick={onClickAdd}>
                            <span>Выбрать</span>
                            {allCountItem()}
                            </button>
                        </div>

                        <div className={s.price}>
                            <div>от {price} ₽</div>
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