import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';
import '../Modal.css';
import DialogsStore from '../../../../store/DialogsStore';
import RenameModalStore from './RenameDialogModalStore';

const RenameModal = observer(() => {
  const closeModal = () => {
    RenameModalStore.closeEditor();
  }
  return (
    <Modal
          isOpen={RenameModalStore.isOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
          className="modal"
        >
          <h2 className='header'>Rename {DialogsStore.getDialogName(RenameModalStore.currentId)}</h2>
          <input autoFocus className="input" value={RenameModalStore.currentNewName} onChange={e => RenameModalStore.changeName(e.target.value)} />
          <div className='button-row'>
            <button onClick={() => RenameModalStore.rename()} type="button" className='delete'>Rename</button>
            <button onClick={() => RenameModalStore.closeEditor()} type="button" className='close'>Cancel</button>
          </div>
        </Modal>
    )
  }
)
export default RenameModal;
