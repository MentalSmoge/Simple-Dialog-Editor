
import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';
import "../Modal.css"
// import { useEffect } from 'react';
import ErrorMessage from '../../components/Error/ErrorMessage';
import SaveModalStore from './SaveStore';
import ProjectsStore from '../Modal_myProj/ProjectsStore';

const SaveModal = observer(() => {

  // useEffect(() => {
  //   // ProjectsStore.setTitle(title: string)
  //   ProjectsStore.loadProjectDetails();
  // }, []);

  const closeModal = () => {
    SaveModalStore.closeModal();
  }

  const saving = () => {
    ProjectsStore.saveProjectChanges(SaveModalStore.title, SaveModalStore.description)
    SaveModalStore.closeModal();
  }

  return (
    <Modal
      isOpen={SaveModalStore.isOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      ariaHideApp={false}
      className="modal"
    >
      <h2 className='header'>Save</h2>
      <p className='p'>Project Title</p>
      <input
        className="input"
        value={SaveModalStore.title}
        onChange={e => SaveModalStore.setTitle(e.target.value)}
      />
      <p className='p'>Description</p>
      <input
        className="input"
        value={SaveModalStore.description}
        onChange={e => SaveModalStore.setDescription(e.target.value)}
      />
      <ErrorMessage />
      <div className='button-row'>
        <button onClick={saving} type="button" className='add'>Save</button>
        <button onClick={() => SaveModalStore.closeModal()} type="button" className='close'>Back</button>
      </div>
    </Modal>
  );
});

export default SaveModal;
