import AddVarModalStore from "../../../store/AddVarModalStore";
import "./Modal.css"

export default function () {
  return (
    <button className='AddDialog-button nodrag' type='button' onClick={() => AddVarModalStore.openEditor()}>Добавить переменную</button>
  );
}
