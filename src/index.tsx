import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import AppContextProvider from './context/context';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
    <ToastContainer
      closeOnClick={false}
      draggable={false}
      position='top-center'
      limit={1}
    />
  </React.StrictMode>
);
