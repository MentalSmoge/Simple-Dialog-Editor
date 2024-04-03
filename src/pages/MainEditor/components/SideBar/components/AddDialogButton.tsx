import AddDialogModalStore from "../../../Modals/Modal_AddDialog/AddDialogModalStore";
import "../../RightSideBar/components/AddButton.css"

export default function () {
  return (
    <button className='AddButton nodrag' type='button' onClick={() => AddDialogModalStore.openEditor()}>Добавить диалог</button>
  );
}
