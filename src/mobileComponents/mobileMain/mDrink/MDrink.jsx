import React from 'react'

import { useSelector } from 'react-redux'

import s from './MDrink.module.scss'
import MItemDrink from './MItemDrink/MItemDrink'
import MSkeleton from './../mSkeleton/MSkeleton'


function MDrink() {

    const { drinks, drinks_status } = useSelector((state) => state.app)


    return (
        <div>
            <div className={s.title}>
                <div className={s.drink_title}>Напитки</div>
            </div>
            
            <div className={s.drink_block}>
                {   
                    drinks_status == 'loading' 
                    ? [...new Array(8)].map((_, index) => <MSkeleton key={index}/>)
                    : drinks.map((item) => <MItemDrink key={item.id} {...item} />) 
                }
            </div>
        </div>
    )
}

export default MDrink