import React from "react";
import { observer } from "mobx-react-lite";
import "./SideBar.css"
import DialogsStore from "../../../../store/DialogsStore";
import SideBarButton from "./SideBar-button";
import AddDialogButton from "./components/AddDialogButton";
import SaveDialogButton from "./components/SaveDialogButton";
import DeleteButton from "./components/DeleteButton";

// const projectId = ProjectsStore.currentProject ? ProjectsStore.currentProject.id : "6";
// eslint-disable-next-line react/function-component-definition
const SideBar = () => {
  return (<div className="SideBar">
      <div className="SideBar-wrapper">
        {DialogsStore.dialogs.map((dialog, index) => (
          <SideBarButton key={dialog.id} dialog={dialog} />
        ))}
      </div>
      <AddDialogButton />
      <SaveDialogButton />
      <DeleteButton />
    </div>);
}

// eslint-disable-next-line react/function-component-definition
const SideBar2 = () => {
  return (<div className="SideBar">
      <div className="SideBar-wrapper">
        {DialogsStore.dialogs.map((dialog) => (
          <SideBarButton key={dialog.id} dialog={dialog} />
        ))}
      </div>
      <AddDialogButton />
    </div>);
}

export {SideBar, SideBar2}

