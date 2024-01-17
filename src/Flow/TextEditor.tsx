import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import './Modal.css';

interface ITextEditor{
  text: string
  func(newText: string): void
}

export default function ({text, func}) {
  const [postContent, setPostContent] = useState(text); // Declare a state variable...
  return (
    <Popup
      trigger={<button className="button"> Open Modal </button>}
      modal
      nested
    >
      {(close) => (
        <div className="wrapper">
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header"> Edit text </div>
            <div className="content">
              <textarea className="textArea" value={postContent} onChange={e => setPostContent(e.target.value)} />
            </div>
            <div className="actions">
              <button
                className="button"
                onClick={() => {
                  console.log('modal closed ');
                  func(postContent);
                  close();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
}
