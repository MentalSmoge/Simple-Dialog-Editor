import AddVarModalStore from "../../../Modals/Modal_AddVariable/AddVarModalStore";
import "./AddButton.css"

export default function () {
  return (
    <button className='AddButton nodrag' type='button' onClick={() => AddVarModalStore.openEditor()}>Добавить переменную</button>
  );
}
