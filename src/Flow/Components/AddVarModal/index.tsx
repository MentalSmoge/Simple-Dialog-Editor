import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';
import './Modal.css';
import DialogsStore from '../../../store/DialogsStore';
import AddVarModalStore from '../../../store/AddVarModalStore';

const AddVarModal = observer(() => {
  const closeModal = () => {
    AddVarModalStore.closeEditor();
  }
  return (
    <Modal
          isOpen={AddVarModalStore.isOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
          className="modal-delete"
        >
          <h2 className='header'>Please enter new dialog name</h2>
          <input autoFocus maxLength={20} className="modal-input" value={AddVarModalStore.currentNewName} onChange={e => AddVarModalStore.changeName(e.target.value)} />
          <div className='button-row'>
            <button onClick={() => AddVarModalStore.addVar(AddVarModalStore.currentNewName)} type="button" className='delete'>Create</button>
            <button onClick={() => AddVarModalStore.closeEditor()} type="button" className='close'>Cancel</button>
          </div>
        </Modal>
    )
  }
)
export default AddVarModal;
