import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';
import '../Modal.css';
import EditModalCharacterStore from './EditCharacterModalStore';
import CharacterStore from '../../../../store/CharacterStore';


const EditModalCharacter = observer(() => {
  const closeModal = () => {
    EditModalCharacterStore.closeEditor();
  }
  return (
    <Modal
          isOpen={EditModalCharacterStore.isOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
          className="modal"
        >
          <h2 className='header'>Edit {CharacterStore.getCharacterName(EditModalCharacterStore.currentId)}</h2>
          <p className='p'>Name</p>
          <input autoFocus className="input" value={EditModalCharacterStore.currentNewName} onChange={e => EditModalCharacterStore.changeName(e.target.value)} />
          <textarea value={EditModalCharacterStore.currentNewBio} onChange={e => EditModalCharacterStore.changeBio(e.target.value)} className='textArea' rows={5} />
          <div className='button-row'>
            <button onClick={() => EditModalCharacterStore.rename()} type="button" className='delete'>Rename</button>
            <button onClick={() => EditModalCharacterStore.closeEditor()} type="button" className='close'>Cancel</button>
          </div>
        </Modal>
    )
  }
)
export default EditModalCharacter;
