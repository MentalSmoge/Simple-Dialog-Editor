// import AddDialogModalStore from "../../../Modals/Modal_AddDialog/AddDialogModalStore";
import React, { useState } from "react";
import Modal from "react-modal";
import ProjectsStore from "../../../Modals/Modal_myProj/ProjectsStore";
import "../../RightSideBar/components/AddButton.css";
import "../../../Modals/Modal.css";
import SaveStore from "../../../Modals/Modal_saveProj/SaveStore";

// eslint-disable-next-line import/export
export default function SaveChangesButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    ProjectsStore.deleteProject();
    closeModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className='AddButton nodrag color_from_del' type='button' onClick={openModal}>
        Удалить проект
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Deletion"
        ariaHideApp={false}
        className="modal del-modal"
      >
        {/* <h2 className='header'>Удалить проект</h2> */}
        <p className='header'>Вы действительно хотите удалить проект "{SaveStore.title}"?</p>
        <div className='button-row'>
          <button onClick={handleDeleteClick} type="button" className='add'>
            Delete
          </button>
          <button onClick={closeModal} type="button" className='close'>
            Back
          </button>
        </div>
      </Modal>
    </>
  );
}
