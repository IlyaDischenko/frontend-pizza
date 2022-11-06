import React from 'react'

import { useSelector } from 'react-redux'

import s from './MPizza.module.scss'
import MItemPizza from './mItemPizza/MItemPizza'
import MSkeleton from './../mSkeleton/MSkeleton'


function MPizza() {

    const { pizzas, status } = useSelector((state) => state.items)


    return (
        <div>
            <div className={s.title}>
                <div className={s.pizza_title}>Пицца</div>
            </div>
            
            <div className={s.pizza_block}>
                {   status == 'error' ? <div> Ошибка </div> :
                    status == 'loading' 
                    ? [...new Array(12)].map((_, index) => <MSkeleton key={index}/>)
                    : pizzas.map((item) => <MItemPizza key={item.uuid} {...item} />) 
                }
            </div>
        </div>
    )
}

export default MPizza