import React from 'react'

import { useDispatch } from 'react-redux'
import { fetchItems } from '../redux/slices/ItemsSlice';

import Pizza from '../components/main/pizza/Pizza'
import s from '../components/main/Main.module.scss'

function Main() {
    const dispatch = useDispatch()

    const getPizzas = async () => {
        dispatch(fetchItems())
    }

    React.useEffect(() => {
        getPizzas()
    },
    [])

    return (
        <main className={s.main}>
            <Pizza />
        </main>
    )
}

export default Main