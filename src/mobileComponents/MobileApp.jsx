import { Routes, Route } from 'react-router-dom';
import MobileHeader from './mobileHeader/MobileHeader'

import s from './MobileApp.module.scss'

function MobileApp() {
    return (
      <div className="App">
            <MobileHeader />
            <div className={s.text}> scroll </div>
                <div className={s.text}> scroll </div>
                <div className={s.text}> scroll </div>
                <div className={s.text}> scroll </div>
                <div className={s.text}> scroll </div>
                <div className={s.text}> scroll </div>
                <div className={s.text}> scroll </div>
            <Routes>
                <Route path="/" element={<h1>Это мобильная версия</h1>} />
            </Routes>
      </div>
    );
  }
  
  export default MobileApp;