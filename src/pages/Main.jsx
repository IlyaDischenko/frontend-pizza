import React from 'react'

import { useDispatch } from 'react-redux'
import { fetchItems } from '../redux/slices/ItemStateSliceFolder/ItemsSlice';

import Pizza from '../components/main/pizza/Pizza'
import s from '../components/main/Main.module.scss'
import Drink from '../components/main/drink/Drink';
import { Link } from 'react-router-dom';

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
            <Link to='/order'>
                <button>orderorder</button>
            </Link>
            <Link to='/myorder'>
                <button>mymymymymymymmymy</button>
            </Link>
            <Pizza />
            <Drink />
        </main>
    )
}

export default MMain