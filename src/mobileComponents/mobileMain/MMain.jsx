import React from 'react'

import { useDispatch } from 'react-redux'
import { fetchItems } from '../../redux/slices/ItemsSlice'

import MPizza from './mPizza/MPizza'
import s from './MMain.module.scss'
import MDrink from './mDrink/MDrink'

function Main() {

    const dispatch = useDispatch()

    const getItems = async () => {
        dispatch(fetchItems())
    }


    React.useEffect(() => {
        getItems()
    },[])


    return (
        <main className={s.main}>
            <MPizza />
            <MDrink />
        </main>
    )
}

export default Main