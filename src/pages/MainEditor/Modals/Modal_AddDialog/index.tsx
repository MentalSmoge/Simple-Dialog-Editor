import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';
import '../Modal.css';
import AddDialogModalStore from './AddDialogModalStore';

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
          className="modal"
        >
          <h2 className='header'>Please enter new dialog name</h2>
          <input autoFocus className="input" value={AddDialogModalStore.currentNewName} onChange={e => AddDialogModalStore.changeName(e.target.value)} />
          <div className='button-row'>
            <button onClick={() => AddDialogModalStore.addDialog(AddDialogModalStore.currentNewName)} type="button" className='add'>Create</button>
            <button onClick={() => AddDialogModalStore.closeEditor()} type="button" className='close'>Cancel</button>
          </div>
        </Modal>
    )
  }
)
export default AddDialogModal;
