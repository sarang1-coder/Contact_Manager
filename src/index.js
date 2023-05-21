import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';


// Fontawesome icons 
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';

// bootstrap 
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { legacy_createStore as createStore } from 'redux';
import contactReducer from './components/redux/reducers/contactReducer';
import { Provider } from 'react-redux';


const store=createStore(contactReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Provider store={store}>
        <BrowserRouter>
      <App />
    </BrowserRouter>
    
   </Provider>

  </React.StrictMode>
);

