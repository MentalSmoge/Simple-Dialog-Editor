// import AddDialogModalStore from "../../../Modals/Modal_AddDialog/AddDialogModalStore";
import "../../RightSideBar/components/AddButton.css"
import { observer } from "mobx-react-lite";
// import { useEffect } from "react";
// import DialogsStore from "../../../../../store/DialogsStore";
import ProjectsStore from "../../../Modals/Modal_myProj/ProjectsStore";

const SaveChangesButton = observer(() => {
  const handleSaveChangesClick = () => {
    ProjectsStore.saveProjectChanges();
  };

  return (
    <button className='AddButton nodrag color_from_save' type='button' onClick={handleSaveChangesClick}>
      Сохранить изменения
    </button>
  );
});

export default SaveChangesButton;
