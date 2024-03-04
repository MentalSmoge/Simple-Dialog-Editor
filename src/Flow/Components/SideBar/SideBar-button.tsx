import DeleteModalStore from "../../../store/DeleteModalStore";
import "./SideBar.css"

export default function ({dialog}) {
  return (
    <button onContextMenu={
      (e) => {
        DeleteModalStore.setCurrentId(dialog.id)
      }

    } className="SideBar-button button_neutral" type="button" key={dialog.id}>{dialog.name}</button>
  );
}
