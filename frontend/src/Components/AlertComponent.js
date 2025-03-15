import React from 'react';
import { useAlert } from '../Context/AlertContext';
import '../styles/AlertComponent.css';

// Material UI Icons
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';

const AlertComponent = () => {
  const { alerts, removeAlert } = useAlert();

  if (alerts.length === 0) return null;

  const getIcon = (severity) => {
    switch (severity) {
      case 'success':
        return <CheckCircleIcon fontSize="inherit" />;
      case 'error':
        return <ErrorIcon fontSize="inherit" />;
      case 'warning':
        return <WarningIcon fontSize="inherit" />;
      case 'info':
        return <InfoIcon fontSize="inherit" />;
      default:
        return <InfoIcon fontSize="inherit" />;
    }
  };

  return (
    <div className="alert-container">
      {alerts.map((alert) => (
        <div 
          key={alert.id} 
          className={`alert-item alert-${alert.severity}`}
        >
          <div className="alert-icon">
            {getIcon(alert.severity)}
          </div>
          <div className="alert-message">
            {alert.message}
          </div>
          <IconButton 
            size="small" 
            className="alert-close" 
            onClick={() => removeAlert(alert.id)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      ))}
    </div>
  );
};

export default AlertComponent; 