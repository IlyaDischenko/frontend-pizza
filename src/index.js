import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MobileApp from './mobileComponents/MobileApp'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { Provider } from 'react-redux'
import { store } from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>

      <BrowserView>
        <Provider store={ store }>
          <App />
        </Provider>
      </BrowserView>
      
      <MobileView>
        <Provider store={ store }> 
          <MobileApp />
        </Provider> 
      </MobileView>

    </BrowserRouter>

  // </React.StrictMode>
);


reportWebVitals();
