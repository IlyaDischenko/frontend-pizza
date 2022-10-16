import React from 'react'

import { useSelector } from 'react-redux'
// import { addToRedux, fetchPizzas } from '../../../redux/slices/ItemsSlice';

import s from './Drink.module.scss'
import ItemDrink from './itemDrink/ItemDrink'
import Skeleton from './../pizza/Skeleton/Skeleton'


function Drink() {

    const { drinks, status } = useSelector((state) => state.items)
    console.log(status)


    return (
        <div>
            <div className={s.title}>
                <div className={s.drink_title}>Напитки</div>
            </div>
            
            <div className={s.drink_block}>
                {   status == 'error' ? <div> Ошибка </div> :
                    status == 'loading' 
                    ? [...new Array(12)].map((_, index) => <Skeleton key={index}/>)
                    : drinks.map((item) => <ItemDrink key={item.id} {...item} />) 
                }
            </div>
        </div>
    )
}

export default Drink