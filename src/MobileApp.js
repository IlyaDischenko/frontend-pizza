import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'


import MMain from './mobileComponents/mobileMain/MMain'
import MLogin from './mobileComponents/mobileLogin/MLogin'
import MProfile from './mobileComponents/mobileProfile/MProfile'
import MCart from './mobileComponents/mobileCart/MCart'
import MOrder from './mobileComponents/mobileOrder/MOrder'
import MMyOrder from './mobileComponents/mobileMyOrder/MMyOrder'

import { getUserInfo } from './redux/slices/UserStateSliceFolder/userAsyncThunk'

import './MobileApp.css'

function MobileApp() {
  const popup = useSelector((state) => state.popup)
  const dispatch = useDispatch()

  async function check_token() {
    if (popup.token !== '') {
      const token = {'token': popup.token}
      await dispatch(getUserInfo(token))
    }
  }


  // setTimeout(function get_info() {
  //     if (popup.token !== '') {
  //       const token = {'token': popup.token}
  //     dispatch(getUserInfo(token))}
  // }, 5000)

  React.useEffect(() => {
    check_token()
  }, [])

    return (
      <div className="App">
            <Routes>
                <Route path="/" element={<MMain />} />
                <Route path="/login" element={<MLogin />} />
                <Route path="/profile" element={<MProfile />} />
                <Route path="/cart" element={<MCart />} />
                <Route path="/order" element={<MOrder />} />
                <Route path="/myorder" element={<MMyOrder />} />
                <Route path="*" element={<h1>Not found</h1>} />
            </Routes>
      </div>
    );
  }
  
  export default MobileApp;