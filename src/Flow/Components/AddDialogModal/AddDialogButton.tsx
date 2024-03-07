import AddDialogModalStore from "../../../store/AddDialogModalStore";
import "./Modal.css"

export default function () {
  return (
    <button className='AddDialog-button nodrag' type='button' onClick={() => AddDialogModalStore.openEditor()}>Добавить диалог</button>
  );
}
