import { Routes, Route } from 'react-router-dom';


import MMain from './mobileComponents/mobileMain/MMain'
import MLogin from './mobileComponents/mobileLogin/MLogin'
import MProfile from './mobileComponents/mobileProfile/MProfile'
import MCart from './mobileComponents/mobileCart/MCart'
import MOrder from './mobileComponents/mobileOrder/MOrder'

import './MobileApp.css'

function MobileApp() {
    return (
      <div className="App">

            <Routes>
                <Route path="/" element={<MMain />} />
                <Route path="/login" element={<MLogin />} />
                <Route path="/profile" element={<MProfile />} />
                <Route path="/cart" element={<MCart />} />
                <Route path="/order" element={<MOrder />} />
                <Route path="*" element={<h1>Not found</h1>} />
            </Routes>
      </div>
    );
  }
  
  export default MobileApp;