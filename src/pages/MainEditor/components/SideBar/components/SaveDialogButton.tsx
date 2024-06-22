import SaveStore from "../../../Modals/Modal_saveProj/SaveStore";
import "../../RightSideBar/components/AddButton.css"
// FIXME: исправить юзание css файла с другой папки

export default function () {
  return (
    <button className='AddButton nodrag' type='button' onClick={() => SaveStore.openModal()}>Сохранить проект</button>
  );
}
