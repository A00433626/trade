import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const domain="dev-gslwvf8o.us.auth0.com"
const clientId="6pXEng5Rr5b2HzylZEtO7PAay9kcn2BC"

ReactDOM.render(
  <BrowserRouter>
     <Auth0Provider domain={domain} clientId={clientId} redirectUri='https://a00433626.github.io/trading/dashboard'>
         <App />
     </Auth0Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
