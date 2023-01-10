import React from 'react'

import { useSelector } from 'react-redux'

import s from './Drink.module.scss'
import ItemDrink from './itemDrink/ItemDrink'
import Skeleton from './../pizza/Skeleton/Skeleton'


function Drink() {

    const { drinks, drinks_status } = useSelector((state) => state.app)


    return (
        <div>
            <div className={s.title}>
                <div className={s.drink_title}>Напитки</div>
            </div>
            
            <div className={s.drink_block}>
                {  
                    drinks_status == 'loading' 
                    ? [...new Array(12)].map((_, index) => <Skeleton key={index}/>)
                    : drinks.map((item) => <ItemDrink key={item.id} {...item} />) 
                }
            </div>
        </div>
    )
}

export default Drink