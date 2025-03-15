import React, { createContext, useState, useContext } from 'react';

// Create the Alert Context
export const AlertContext = createContext();

// Alert Provider Component
export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  // Add a new alert
  const addAlert = (message, severity = 'info', duration = 5000) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newAlert = {
      id,
      message,
      severity,
      duration
    };
    
    setAlerts(prevAlerts => [...prevAlerts, newAlert]);
    
    // Auto remove the alert after duration
    if (duration !== 0) {
      setTimeout(() => {
        removeAlert(id);
      }, duration);
    }
    
    return id;
  };

  // Remove an alert by id
  const removeAlert = (id) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
  };

  // Success alert shorthand
  const success = (message, duration) => addAlert(message, 'success', duration);
  
  // Error alert shorthand
  const error = (message, duration) => addAlert(message, 'error', duration);
  
  // Warning alert shorthand
  const warning = (message, duration) => addAlert(message, 'warning', duration);
  
  // Info alert shorthand
  const info = (message, duration) => addAlert(message, 'info', duration);

  return (
    <AlertContext.Provider value={{ 
      alerts, 
      addAlert, 
      removeAlert,
      success,
      error,
      warning,
      info
    }}>
      {children}
    </AlertContext.Provider>
  );
};

// Custom hook to use the alert context
export const useAlert = () => useContext(AlertContext); 