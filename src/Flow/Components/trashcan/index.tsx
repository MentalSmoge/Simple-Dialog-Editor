import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';
import '../Modal.css';
import DialogsStore from '../../../store/DialogsStore';
import EditDialogModalStore from '../../../pages/MainEditor/Modals/Modal_EditDialog/RenameDialogModalStore';

const EditDialogModal = observer(() => {
  const closeModal = () => {
    EditDialogModalStore.closeEditor();
  }
  return (
    <Modal
          isOpen={EditDialogModalStore.isOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
          className="modal-rename"
        >
          <h2 className='header'>Rename {DialogsStore.getDialogName(EditDialogModalStore.currentId)}</h2>
          <p className='modal-p'>Max length 20 symbols</p>
          <input autoFocus maxLength={20} className="modal-input" defaultValue={DialogsStore.getDialogName(EditDialogModalStore.currentId)} value={EditDialogModalStore.currentNewName} onChange={e => EditDialogModalStore.changeName(e.target.value)} />
          <div className='button-row'>
            <button onClick={() => EditDialogModalStore.rename()} type="button" className='delete'>Rename</button>
            <button onClick={() => EditDialogModalStore.closeEditor()} type="button" className='close'>Cancel</button>
          </div>
        </Modal>
    )
  }
)
export default EditDialogModal;
