// import AddDialogModalStore from "../../../Modals/Modal_AddDialog/AddDialogModalStore";
import "../../RightSideBar/components/AddButton.css"
import { observer } from "mobx-react-lite";
// import { useEffect } from "react";
// import DialogsStore from "../../../../../store/DialogsStore";
import ProjectsStore from "../../../Modals/Modal_myProj/ProjectsStore";

const SaveChangesButton = observer(() => {
  const handleSaveChangesClick = () => {
    ProjectsStore.deleteProject();
  };

  return (
    <button className='AddButton nodrag color_from_del' type='button' onClick={handleSaveChangesClick}>
      Удалить проект
    </button>
  );
});

export default SaveChangesButton;
