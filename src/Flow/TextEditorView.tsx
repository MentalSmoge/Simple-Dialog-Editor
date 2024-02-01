import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';
import './Modal.css';
import Store from '../store/TextEditorStore';



const TextEditorView = observer(() => {

  function closeModal() {
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
          <h2>Text Edit</h2>
          <textarea className="textArea" value={Store.currentText} onChange={e => Store.changeText(e.target.value)} />
          <br/>
          <button onClick={() => Store.closeEditor()}>close</button>
        </Modal>
    )
  }
)
export default TextEditorView;
