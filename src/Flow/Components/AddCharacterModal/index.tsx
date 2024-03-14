import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';
import './Modal.css';
import AddCharacterModalStore from '../../../store/AddCharacterModalStore';

const AddCharacterModal = observer(() => {
  const closeModal = () => {
    AddCharacterModalStore.closeEditor();
  }
  return (
    <Modal
          isOpen={AddCharacterModalStore.isOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
          className="modal-delete"
        >
          <h2 className='header'>Please enter new character name</h2>
          <input autoFocus className="modal-input" value={AddCharacterModalStore.currentNewName} onChange={e => AddCharacterModalStore.changeName(e.target.value)} />
          <div className='button-row'>
            <button onClick={() => AddCharacterModalStore.addCharacter(AddCharacterModalStore.currentNewName)} type="button" className='delete'>Create</button>
            <button onClick={() => AddCharacterModalStore.closeEditor()} type="button" className='close'>Cancel</button>
          </div>
        </Modal>
    )
  }
)
export default AddCharacterModal;
