import AddDialogModalStore from "../../../../pages/MainEditor/Modals/Modal_AddDialog/AddDialogModalStore";
import "./Modal.css"

export default function () {
  return (
    <button className='AddDialog-button nodrag' type='button' onClick={() => AddDialogModalStore.openEditor()}>Добавить диалог</button>
  );
}
