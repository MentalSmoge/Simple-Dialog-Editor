import { observer } from "mobx-react-lite";
import DeleteModalStore from "../../Modals/Modal_Delete/DeleteModalStore";
import RenameModalStore from "../../Modals/Modal_EditDialog/RenameDialogModalStore";
import "./RightSideBar.css"
import DialogsStore from "../../../../store/DialogsStore";

export default observer(function ({dialog}) {
  return (
    <button onContextMenu={
      (e) => {
        DeleteModalStore.setCurrentId(dialog.id)
        RenameModalStore.setCurrentId(dialog.id)
      }

    } onClick={() => DialogsStore.changeDialog(dialog.id)} className={DialogsStore.currentDialogId===dialog.id ? "RightSideBar-button button_neutral highlight" : "RightSideBar-button button_neutral"} type="button" key={dialog.id}>{dialog.name}</button>
  );
}
)
