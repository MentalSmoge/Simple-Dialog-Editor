import { observer } from "mobx-react-lite";
import DeleteModalStore from "../../../store/DeleteModalStore";
import RenameModalStore from "../../../store/RenameModalStore";
import "./SideBar.css"
import DialogsStore from "../../../store/DialogsStore";

export default observer(function ({dialog}) {
  return (
    <button onContextMenu={
      (e) => {
        DeleteModalStore.setCurrentId(dialog.id)
        RenameModalStore.setCurrentId(dialog.id)
      }

    } onClick={() => DialogsStore.changeDialog(dialog.id)} className={DialogsStore.currentDialogId===dialog.id ? "SideBar-button button_neutral highlight" : "SideBar-button button_neutral"} type="button" key={dialog.id}>{dialog.name}</button>
  );
}
)
