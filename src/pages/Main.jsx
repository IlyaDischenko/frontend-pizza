import React from 'react'

import { useDispatch } from 'react-redux'
import { fetchItems } from '../redux/slices/ItemsSlice';

import Pizza from '../components/main/pizza/Pizza'
import s from '../components/main/Main.module.scss'
import Drink from '../components/main/drink/Drink';

function MMain() {

    const dispatch = useDispatch()

    const getItems = async () => {
        dispatch(fetchItems())
    }


    React.useEffect(() => {
        getItems()
    },[])


    return (
        <main className={s.main}>
            <Pizza />
            <Drink />
        </main>
    )
}

export default MMain