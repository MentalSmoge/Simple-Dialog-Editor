import { makeAutoObservable } from "mobx"
import FlowStore from "./FlowStore"

class TextEditorStore {
  isOpen=false

  currentText=""

  currentId = ""

  constructor(){
    makeAutoObservable(this)
  }

  openEditor(text : string, nodeId : string) {
    this.isOpen = true
    this.changeText(text)
    this.currentId = nodeId
  }

  closeEditor() {
    this.isOpen = false
    FlowStore.updateTextInNode(this.currentId, `${this.currentText}SAS`)
  }

  changeText(newText : string) {
    this.currentText = newText
  }
}

export default new TextEditorStore()


// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import ReactDOM from 'react-dom';
// import './Modal.css';
// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//   },
// };

// export default function({modalIsOpen, afterOpenModal, closeModal}) {
//   return (
//   <Modal
//         isOpen={modalIsOpen}
//         onAfterOpen={afterOpenModal}
//         onRequestClose={closeModal}
//         style={customStyles}
//         contentLabel="Example Modal"
//       >
//         <h2>Hello</h2>
//         <button onClick={closeModal}>close</button>
//         <div>I am a modal</div>
//         <form>
//           <input />
//           <button>tab navigation</button>
//           <button>stays</button>
//           <button>inside</button>
//           <button>the modal</button>
//         </form>
//       </Modal>
//   )
// }

// export default function ({text, func}) {
//   const [postContent, setPostContent] = useState(text); // Declare a state variable...
//   return (
//     <Popup
//       trigger={<button className="button"> Open Modal </button>}
//       modal
//       nested
//     >
//       {(close) => (
//         <div className="wrapper">
//           <div className="modal">
//             <button className="close" onClick={close}>
//               &times;
//             </button>
//             <div className="header"> Edit text </div>
//             <div className="content">
//               <textarea className="textArea" value={postContent} onChange={e => setPostContent(e.target.value)} />
//             </div>
//             <div className="actions">
//               <button
//                 className="button"
//                 onClick={() => {
//                   console.log('modal closed ');
//                   func(postContent);
//                   close();
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </Popup>
//   );
// }
