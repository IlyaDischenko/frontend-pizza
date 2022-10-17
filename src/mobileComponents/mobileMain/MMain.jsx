import React from 'react'

import { useDispatch } from 'react-redux'
import { fetchItems } from '../../redux/slices/ItemStateSliceFolder/ItemsSlice'

import MPizza from './mPizza/MPizza'
import s from './MMain.module.scss'
import MDrink from './mDrink/MDrink'
import MHeader from '../mobileHeader/MobileHeader'

function Main() {

    const dispatch = useDispatch()

    const getItems = async () => {
        dispatch(fetchItems())
    }


    React.useEffect(() => {
        getItems()
    },[])


    return (
        <>
            <MHeader />
            <main className={s.main}>
                <MPizza />
                <MDrink />
            </main>
        </>
    )
}

export default Main