import React from 'react';
import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';
import NewProjectModalStore from './NewProjectModalStore';
import ErrorMessage from '../../components/Error/ErrorMessage';
import "../Modal.css"

const NewProjectModal = observer(() => {
  const closeModal = () => {
    NewProjectModalStore.closeModal();
  };

  const handleCreateProject = () => {
    NewProjectModalStore.createNewProject();
  };

  return (
    <Modal
      isOpen={NewProjectModalStore.isOpen}
      onRequestClose={closeModal}
      contentLabel="Register Modal"
      ariaHideApp={false}
      className="modal add-modal"
    >
      <h2 className='header'>New project</h2>
      <p className='p'>Name project</p>
      <input
          className="input"
          value={NewProjectModalStore.newProjectName}
          onChange={(e) => NewProjectModalStore.setNewProjectName(e.target.value)}
      />
      <p className='p'>Description project</p>
      <input
        // autoFocus
          className="input"
          value={NewProjectModalStore.newProjectDescription}
          onChange={(e) => NewProjectModalStore.setNewProjectDescription(e.target.value)}
        />
        <ErrorMessage />
        <div className='button-row'>
          <button onClick={handleCreateProject} type="button" className='add'>Add</button>
          <button onClick={closeModal} type="button" className='close'>Close</button>
        </div>
    </Modal>
  );
});

export default NewProjectModal;
