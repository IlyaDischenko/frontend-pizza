import React from 'react'
import axios from 'axios'

import s from './Pizza.module.scss'
import Item_pizza from './item_pizza/Item_pizza'


    // axios.get('https://backend-pizza-test.herokuapp.com/get', {mode: 'no-cors'})
    // .then((responce) => {
        
    // })
    // , {mode: 'no-cors'}

function Pizza() {


    const [items, setitems] = React.useState([])

    React.useEffect(() => {
        axios.get('https://backend-pizza-test.herokuapp.com/get')
        // .then((res) => {
        //     console.log(res)
        //     return res.json()
        // })
        .then((arr) => {
            console.log(arr)
            setitems(arr.data.pizza)
        })
    }, [])


    return (
        <div>
            <div className={s.pizza_title}>Пицца</div>
            <div className={s.pizza_block}>
                {items.map((item) => (
                    <Item_pizza key={item.id} {...item} />
                ))}
            </div>
        </div>
    )
}

export default Pizza