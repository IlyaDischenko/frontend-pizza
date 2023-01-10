import React from 'react'

import { useSelector } from 'react-redux'

import s from './Pizza.module.scss'
import ItemPizza from './itempizza/ItemPizza'
import Skeleton from './Skeleton/Skeleton'


function Pizza() {

    const { pizzas, pizzas_status } = useSelector((state) => state.app)


    return (
        <div>
            <div className={s.title}>
                <div className={s.pizza_title}>Пицца</div>
            </div>
            
            <div className={s.pizza_block}>
                { 
                    pizzas_status === 'loading' 
                    ? [...new Array(12)].map((_, index) => <Skeleton key={index}/>)
                    : pizzas.map((item) => <ItemPizza key={item.id} {...item} />) 
                }
            </div>
            

        </div>
    )
}

export default Pizza