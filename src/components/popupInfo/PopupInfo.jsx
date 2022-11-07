import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import s from './PopupInfo.module.scss'

// import MHeader from '../mobileHeader/MobileHeader'
// import { Link } from 'react-router-dom'
// import { updateApartment, updateEntrance, updateFloor, updateHouse, updateStreet } from '../../redux/slices/UserStateSliceFolder/userSlice';
// import { changeComment } from '../../redux/slices/orderStateSliceFolder/orderSlise';
// import { get_street, set_order } from '../../redux/slices/orderStateSliceFolder/orderAsyncThunk';
import { setPopupInfoTrue, setPopupInfoFalse } from '../../redux/slices/ItemStateSliceFolder/ItemsSlice';

function PopupInfo(firstMessage, secondMessage) {
    const cartPizzaState = useSelector((state) => state.cartPizza)
    const cartDrinkState = useSelector((state) => state.cartDrink)
    const cartPromoState = useSelector((state) => state.promo)
    const user = useSelector((state) => state.user)
    const order = useSelector((state) => state.order)
    const popup = useSelector((state) => state.popup)
    const dispatch = useDispatch()



    React.useEffect(() => {
        setTimeout(() => console.log("Hello, World!"), 3000);
        dispatch(setPopupInfoTrue())
    },[])



    return (
        <>
        </>
    )
}



export default PopupInfo