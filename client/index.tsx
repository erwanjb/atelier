import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApiProvider } from './contexts/ApiContext';
import {store, persistor} from "./store";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { AuthProvider } from "./contexts/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApiProvider baseURL={process.env.API_URL}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ApiProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);