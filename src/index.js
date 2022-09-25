import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>

      {/* <BrowserView> */}
        <App />
      {/* </BrowserView> */}
      
      {/* <MobileView>
        <h1>This is rendered only on mobile</h1>
      </MobileView> */}

    </BrowserRouter>

  </React.StrictMode>
);


reportWebVitals();
