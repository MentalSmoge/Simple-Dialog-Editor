import React from 'react';
import { observer } from 'mobx-react-lite';
import AuthModalStore from '../../Modals/Modal_Login/AuthModalStore';
import RegisterModalStore from '../../Modals/Modal_Register/RegisterModalStore';
import './ErrorMessage.css';


const ErrorMessage = observer(() => {
  if (!AuthModalStore.errorMessage && !RegisterModalStore.errorMessage) return null;

  return (
    <div className="error-message">
      {AuthModalStore.errorMessage}
      {RegisterModalStore.errorMessage}
    </div>
  );
});

export default ErrorMessage;
