import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';
import DeleteModalStore from './DeleteModalStore';
import '../Modal.css';

const DeleteModal = observer(() => {
  const closeModal = () => {
    DeleteModalStore.closeEditor();
  }
  return (
    <Modal
          isOpen={DeleteModalStore.isOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
          className="modal-delete"
        >
          <h2  className='header'>Delete {DeleteModalStore.getName()}?</h2>
          <div className='button-row'>
            <button onClick={() => DeleteModalStore.delete()} type="button" className='delete'>Yes</button>
            <button onClick={() => DeleteModalStore.closeEditor()} type="button" className='close'>No</button>
          </div>
        </Modal>
    )
  }
)
export default DeleteModal;
