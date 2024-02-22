import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// import { loadUser } from './store/slices/authSlice.ts';
// import { store } from './store/store.ts';


// store.dispatch<any>(loadUser());
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
