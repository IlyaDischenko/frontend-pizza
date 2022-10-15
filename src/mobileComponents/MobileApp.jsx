import { Routes, Route } from 'react-router-dom';
import MobileHeader from './mobileHeader/MobileHeader'

import MMain from './mobileMain/MMain'

import s from './MobileApp.module.scss'

function MobileApp() {
    return (
      <div className="App">
            <MobileHeader />
            <Routes>
                <Route path="/" element={<MMain />} />
                <Route path="/login" element={<h1>страница логина</h1>} />
                <Route path="/profile" element={<h1>профиль</h1>} />
                <Route path="*" element={<h1>Not found</h1>} />
            </Routes>
      </div>
    );
  }
  
  export default MobileApp;