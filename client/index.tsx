import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApiProvider } from './contexts/ApiContext';

ReactDOM.render(
  <React.StrictMode>
    <ApiProvider baseURL={process.env.API_URL}>
      <App />
    </ApiProvider>
  </React.StrictMode>,
  document.getElementById('root')
);