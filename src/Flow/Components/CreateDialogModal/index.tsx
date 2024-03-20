import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';
import './Modal.css';
import DialogsStore from '../../../store/DialogsStore';
import RenameDialogModalStore from '../../../store/RenameDialogModalStore';

const CreateDialogModal = observer(() => {
  const closeModal = () => {
    RenameDialogModalStore.closeEditor();
  }
  return (
    <Modal
          isOpen={RenameDialogModalStore.isOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
          className="modal-rename"
        >
          <h2 className='header'>Rename {DialogsStore.getDialogName(RenameDialogModalStore.currentId)}</h2>
          <p className='modal-p'>Max length 20 symbols</p>
          <input autoFocus maxLength={20} className="modal-input" defaultValue={DialogsStore.getDialogName(RenameDialogModalStore.currentId)} value={RenameDialogModalStore.currentNewName} onChange={e => RenameDialogModalStore.changeName(e.target.value)} />
          <div className='button-row'>
            <button onClick={() => RenameDialogModalStore.rename()} type="button" className='delete'>Rename</button>
            <button onClick={() => RenameDialogModalStore.closeEditor()} type="button" className='close'>Cancel</button>
          </div>
        </Modal>
    )
  }
)
export default CreateDialogModal;
