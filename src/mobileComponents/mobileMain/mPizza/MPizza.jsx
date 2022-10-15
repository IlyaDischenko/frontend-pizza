import React from 'react'

import { useSelector } from 'react-redux'

import s from './MPizza.module.scss'
import ItemPizza from './mItemPizza/MItemPizza'
import Skeleton from './mskeleton/MSkeleton'


function MPizza() {

    const { pizzas, status } = useSelector((state) => state.items)
    // console.log(pizzas)


    return (
        <div>
            <div className={s.title}>
                <div className={s.pizza_title}>Пицца</div>
            </div>
            
            <div className={s.pizza_block}>
                {   status == 'error' ? <div> Ошибка </div> :
                    status == 'loading' 
                    ? [...new Array(12)].map((_, index) => <Skeleton key={index}/>)
                    : pizzas.map((item) => <ItemPizza key={item.id} {...item} />) 
                }
                {/* {pizzas.map((item) => <ItemPizza key={item.id} {...item} />)} */}
            </div>
            

        </div>
    )
}

export default MPizza