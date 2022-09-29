import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { addToRedux, fetchPizzas } from '../../../redux/slices/ItemsSlice';

import s from './Pizza.module.scss'
import ItemPizza from './itempizza/ItemPizza'
import Skeleton from './Skeleton/Skeleton'
import Sort from '../../sort/Sort'


function Pizza() {

    const { pizzas, status } = useSelector((state) => state.items)
    console.log(status)


    return (
        <div>
            <div className={s.title}>
                <div className={s.pizza_title}>Пицца</div>
                <Sort />
            </div>
            
            <div className={s.pizza_block}>
                {/* //asdasd выа ываыаываываываываываываываываываываываываываываываываываыва */          }
                {   status == 'error' ? <div> Ошибка </div> :
                    status == 'loading' 
                    ? [...new Array(12)].map((_, index) => <Skeleton key={index}/>)
                    : pizzas.map((item) => <ItemPizza key={item.id} {...item} />) 
                }
            </div>
        </div>
    )
}

export default Pizza