import React from 'react';
import Popup from 'reactjs-popup';
import './Modal.css';

export default function () {
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
              <textarea className='textArea' />
            </div>
            <div className="actions">

              <button
                className="button"
                onClick={() => {
                  console.log('modal closed ');
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
