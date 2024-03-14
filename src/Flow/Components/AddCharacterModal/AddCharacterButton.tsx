import AddCharacterModalStore from "../../../store/AddCharacterModalStore";
import "./Modal.css"

export default function () {
  return (
    <button className='AddDialog-button nodrag' type='button' onClick={() => AddCharacterModalStore.openEditor()}>Добавить персонажа</button>
  );
}
