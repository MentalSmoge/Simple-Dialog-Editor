import AddVarModalStore from "../../../../pages/MainEditor/Modals/Modal_AddVariable/AddVarModalStore";
import "./Modal.css"

export default function () {
  return (
    <button className='AddDialog-button nodrag' type='button' onClick={() => AddVarModalStore.openEditor()}>Добавить переменную</button>
  );
}
