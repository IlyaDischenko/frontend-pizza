import { Routes, Route } from 'react-router-dom';
import MobileHeader from './mobileHeader/MobileHeader'

function MobileApp() {
    return (
      <div className="App">
            <MobileHeader />
            <Routes>
                <Route path="/" element={<h1>Это мобильная версия</h1>} />
            </Routes>
      </div>
    );
  }
  
  export default MobileApp;