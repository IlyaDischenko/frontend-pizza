  import { Routes, Route } from 'react-router-dom';
import './App.css';

import Header from'./components/header/Header'
import Cart from './pages/Cart'
import Main from'./pages/Main'
import Profile from'./pages/Profile'
import NotFound from'./pages/NotFound'
import Test from'./pages/Test'

function App() {
  return (
    <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/test" element={<Test />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
    </div>
  );
}

export default App;
