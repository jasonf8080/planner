import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { MainProvider } from './context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MainProvider>
  </React.StrictMode>
);


