import React from 'react';
import { observer } from 'mobx-react-lite';
import AuthModalStore from '../../Modals/Modal_Login/AuthModalStore';
import RegisterModalStore from '../../Modals/Modal_Register/RegisterModalStore';
import ProjectsStore from '../../Modals/Modal_myProj/ProjectsStore';
import './ErrorMessage.css';
import NewProjectModalStore from '../../Modals/Modal_AddProj/NewProjectModalStore';


const ErrorMessage = observer(() => {
  if (!AuthModalStore.errorMessage && !RegisterModalStore.errorMessage && !ProjectsStore.errorMessage && !NewProjectModalStore.errorMessage) return null;

  return (
    <div className="error-message">
      {AuthModalStore.errorMessage}
      {RegisterModalStore.errorMessage}
      {ProjectsStore.errorMessage}
      {NewProjectModalStore.errorMessage}
    </div>
  );
});

export default ErrorMessage;
