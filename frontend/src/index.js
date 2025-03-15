import React from 'react';
import ReactDOM from 'react-dom';
import './styles/theme.css'; // Import theme first
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContextProvider } from './Context/AuthContext';
import { AlertProvider } from './Context/AlertContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AlertProvider>
        <App />
      </AlertProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
