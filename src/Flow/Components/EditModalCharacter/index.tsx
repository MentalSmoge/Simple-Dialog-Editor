import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';
import './Modal.css';
import DialogsStore from '../../../store/DialogsStore';
import RenameModalStore from '../../../store/RenameModalStore';

const EditModalCharacter = observer(() => {
  const closeModal = () => {
    RenameModalStore.closeEditor();
  }
  return (
    <Modal
          isOpen={RenameModalStore.isOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
          className="modal-rename"
        >
          <h2 className='header'>Rename {DialogsStore.getDialogName(RenameModalStore.currentId)}</h2>
          <p className='modal-p'>Max length 20 symbols</p>
          <input autoFocus maxLength={20} className="modal-input" value={RenameModalStore.currentNewName} onChange={e => RenameModalStore.changeName(e.target.value)} />
          <div className='button-row'>
            <button onClick={() => RenameModalStore.rename()} type="button" className='delete'>Rename</button>
            <button onClick={() => RenameModalStore.closeEditor()} type="button" className='close'>Cancel</button>
          </div>
        </Modal>
    )
  }
)
export default EditModalCharacter;
