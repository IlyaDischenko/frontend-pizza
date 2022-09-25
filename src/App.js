import { Routes, Route } from 'react-router-dom';
import './App.css';

import Header from'./components/header/Header'
import Cart from './pages/Cart'
import Main from'./pages/Main'
import NotFound from'./pages/NotFound'

function App() {
  return (
    <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
    </div>
  );
}

export default App;
