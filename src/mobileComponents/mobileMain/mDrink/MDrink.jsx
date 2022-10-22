import React from 'react'

import { useSelector } from 'react-redux'
import { addToRedux, fetchPizzas } from '../../../redux/slices/ItemStateSliceFolder/ItemsSlice';

import s from './MDrink.module.scss'
import MItemDrink from './MItemDrink/MItemDrink'
import Skeleton from './../mPizza/mskeleton/MSkeleton'


function MDrink() {

    const { drinks, status } = useSelector((state) => state.items)



    return (
        <div>
            <div className={s.title}>
                <div className={s.drink_title}>Напитки</div>
            </div>
            
            <div className={s.drink_block}>
                {   status == 'error' ? <div> Ошибка </div> :
                    status == 'loading' 
                    ? [...new Array(12)].map((_, index) => <Skeleton key={index}/>)
                    : drinks.map((item) => <MItemDrink key={item.id} {...item} />) 
                }
            </div>
        </div>
    )
}

export default MDrink