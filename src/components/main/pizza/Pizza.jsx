import React from 'react'
import axios from 'axios'

import s from './Pizza.module.scss'
import ItemPizza from './itempizza/ItemPizza'
import Skeleton from './Skeleton/Skeleton'


function Pizza() {

    const [isLoading, setIsLoading] = React.useState(true)
    const [items, setitems] = React.useState([])

    React.useEffect(() => {
        axios.get('https://backend-pizza-test.herokuapp.com/get')
        .then((arr) => {
            setitems(arr.data.pizza)
            setIsLoading(false)
        })
    }, [])


    return (
        <div>
            <div className={s.pizza_title}>Пицца</div>
            <div className={s.pizza_block}>
                {
                    isLoading 
                    ? [...new Array(12)].map((_, index) => <Skeleton key={index}/>)
                    : items.map((item) => <ItemPizza key={item.id} {...item} />) 
                }
            </div>
        </div>
    )
}

export default Pizza