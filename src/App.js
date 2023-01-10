import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { useDispatch, useSelector } from 'react-redux'

import Header from'./components/header/Header'
import Cart from './pages/Cart'
import Main from'./pages/Main'
import Profile from'./pages/Profile'
import NotFound from'./pages/NotFound'
import Test from'./pages/Test'
import Order from './components/order/Order'
import MyOrder from './components/myorder/MyOrder'
import Footer from './components/footer/Footer';

import { getUserInfo } from './redux/slices/UserStateSliceFolder/userAsyncThunk'
import { getItems } from './redux/slices/AppState/appAsyncThunk';

function App() {
  const popup = useSelector((state) => state.popup)
  const { work, noWorkMessage } = useSelector((state) => state.app)
  const dispatch = useDispatch()

  async function check_token() {
    if (popup.token !== '') {
      const token = {'token': popup.token}
      await dispatch(getUserInfo(token))
    }
  }

  const getAllItems = async () => {
    dispatch(getItems())
  }

  React.useEffect(() => {
    check_token()
  }, [])

  React.useEffect(() => {
      getAllItems()
  },[])

  if (work === false) {
    return (
      <main className='noWorkContainer'>
        <div className='noWorInfo'>{noWorkMessage}</div>
      </main>
    )
  } else {
    return (
      <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/test" element={<Test />} />
              <Route path="/order" element={<Order />} />
              <Route path="/myorder" element={<MyOrder />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
      </div>
    )
  }
}

export default App;
