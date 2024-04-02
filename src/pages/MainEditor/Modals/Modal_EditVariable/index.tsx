import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';
import '../Modal.css';
import DialogsStore from '../../../../store/DialogsStore';
import EditModalVariableStore from './EditVariableModalStore';

const EditModalVariable = observer(() => {
  const closeModal = () => {
    EditModalVariableStore.closeEditor();
  }
  return (
    <Modal
          isOpen={EditModalVariableStore.isOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
          className="modal-rename"
        >
          <h2 className='header'>Rename {DialogsStore.getDialogName(EditModalVariableStore.currentId)}</h2>
          <p className='modal-p'>New Name</p>
          <input autoFocus className="modal-input" value={EditModalVariableStore.currentNewName} onChange={e => EditModalVariableStore.changeName(e.target.value)} />
          <div className='button-row'>
            <button onClick={() => EditModalVariableStore.rename()} type="button" className='delete'>Rename</button>
            <button onClick={() => EditModalVariableStore.closeEditor()} type="button" className='close'>Cancel</button>
          </div>
        </Modal>
    )
  }
)
export default EditModalVariable;
