import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';
import './Modal.css';
import Store from '../store/TextEditorStore';



const TextEditorView = observer(() => {
  const closeModal = () => {
    Store.closeEditor();
  }
  return (
    <Modal
          isOpen={Store.isOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
          className="modal"
        >
          <h2 className='header'>Text Edit</h2>
          <textarea className="textArea" value={Store.currentText} onChange={e => Store.changeText(e.target.value)} />
          <div className='button-row'>
            <button onClick={() => Store.closeEditor()} type="button" className='close'>close</button>
            <button onClick={() => Store.closeEditor()} type="button" className='close'>close</button>
          </div>
        </Modal>
    )
  }
)
export default TextEditorView;
