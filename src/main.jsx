import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import LenteProvider from './context/LenteContext.jsx';
import PedidoProvider from './context/PedidoContext.jsx';
import { UserProvider } from './context/UserContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <LenteProvider>
      <PedidoProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PedidoProvider>
    </LenteProvider>
  </UserProvider>
)

