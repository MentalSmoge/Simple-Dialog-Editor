import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';
import './Modal.css';
import DialogsStore from '../../../store/DialogsStore';
import AddDialogModalStore from '../../../store/AddDialogModalStore';

const AddDialogModal = observer(() => {
  const closeModal = () => {
    AddDialogModalStore.closeEditor();
  }
  return (
    <Modal
          isOpen={AddDialogModalStore.isOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
          className="modal-delete"
        >
          <h2 className='header'>Please enter new dialog name</h2>
          <input autoFocus maxLength={20} className="modal-input" value={AddDialogModalStore.currentNewName} onChange={e => AddDialogModalStore.changeName(e.target.value)} />
          <div className='button-row'>
            <button onClick={() => AddDialogModalStore.addDialog(AddDialogModalStore.currentNewName)} type="button" className='delete'>Create</button>
            <button onClick={() => AddDialogModalStore.closeEditor()} type="button" className='close'>Cancel</button>
          </div>
        </Modal>
    )
  }
)
export default AddDialogModal;
