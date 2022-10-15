import React from 'react'

import { useSelector } from 'react-redux'

function MPizza() {

    const { pizzas, status } = useSelector((state) => state.items)


    return (
        <div>MDRINK</div>
    )
}

export default MPizza