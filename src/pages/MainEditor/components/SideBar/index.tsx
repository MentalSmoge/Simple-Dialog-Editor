import React from "react";
import { observer } from "mobx-react-lite";
import "./SideBar.css"
import DialogsStore from "../../../../store/DialogsStore";
import SideBarButton from "./SideBar-button";
import AddDialogButton from "../../../../Flow/Components/trashcan/AddDialogModal/AddDialogButton";


// eslint-disable-next-line react/function-component-definition
const SideBar = () => {
  return (<div className="SideBar">
      <div className="SideBar-wrapper">
        {DialogsStore.dialogs.map((dialog, index) => (
          <SideBarButton key={dialog.id} dialog={dialog} />
        ))}
      </div>
      <AddDialogButton />
    </div>);
}

export default observer(SideBar)
