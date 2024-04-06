import AddDialogModalStore from "../../../Modals/Modal_AddDialog/AddDialogModalStore";
import "../../RightSideBar/components/AddButton.css"
// FIXME: исправить юзание css файла с другой папки

export default function () {
  return (
    <button className='AddButton nodrag' type='button' onClick={() => AddDialogModalStore.openEditor()}>Добавить диалог</button>
  );
}
