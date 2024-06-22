import AddCharacterModalStore from "../../../Modals/Modal_AddCharacter/AddCharacterModalStore";
import "./AddButton.css"

export default function () {
  return (
    <button className='AddButton nodrag' type='button' onClick={() => AddCharacterModalStore.openEditor()}>Добавить персонажа</button>
  );
}
