import AddCharacterModalStore from "../../../../pages/MainEditor/Modals/Modal_AddCharacter/AddCharacterModalStore";
// import "../Modal.css"

export default function () {
  return (
    <button className='AddDialog-button nodrag' type='button' onClick={() => AddCharacterModalStore.openEditor()}>Добавить персонажа</button>
  );
}
