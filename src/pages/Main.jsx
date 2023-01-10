import React from 'react'

import { useSelector } from 'react-redux'

import Pizza from '../components/main/pizza/Pizza'
import s from '../components/main/Main.module.scss'
import Drink from '../components/main/drink/Drink';

function Main() {

    const { drinks_view } = useSelector((state) => state.app)


    return (
        <main className={s.main}>
            <Pizza />
            {
                drinks_view ? <Drink /> : ''
            }
        </main>
    )
}

export default Main