import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MobileApp from './MobileApp'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { BrowserView, MobileView, IOSView, isEdge, isBrowser, isMobile, TabletView, isSafari, isTablet } from 'react-device-detect';
import { Provider } from 'react-redux'
import { store } from './redux/store'

const View = () => {
  if (isTablet == true) {
    return (
      <TabletView>
        <Provider store={ store }> 
          <MobileApp />
          {/* <div>TabletViewTabletViewTabletViewTabletViewTabletView</div> */}
        </Provider> 
      </TabletView>
    )
  }else if (isMobile == true) {
    return (
      <MobileView>
        <Provider store={ store }> 
          <MobileApp />
          {/* <div>MobileViewMobileViewMobileViewMobileViewMobileView</div> */}
        </Provider> 
      </MobileView>
    )
  }else if (isBrowser == true) {
    return (
      <BrowserView>
        <Provider store={ store }>
          <App />
          {/* <div>BrowserViewBrowserViewBrowserViewBrowserViewBrowserView</div> */}
        </Provider>
      </BrowserView>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      {View()}


      



      {/* <IOSView>
        <Provider store={ store }> 
          <MobileApp />
          <div>IOSViewIOSViewIOSViewIOSViewIOSViewIOSView</div>
        </Provider> 
      </IOSView> */}

    </BrowserRouter>

  // </React.StrictMode>
);


reportWebVitals();
