import React from "react";
import "./SideBar.css"
import DialogsStore from "../../../store/DialogsStore";
import SideBarButton from "./SideBar-button";
import { observer } from "mobx-react-lite";


// eslint-disable-next-line react/function-component-definition
const SideBar = () => {
  return (<div className="SideBar">
      <div className="SideBar-wrapper">
        {DialogsStore.dialogs.map((dialog, index) => (
          <SideBarButton key={dialog.id} dialog={dialog} />
        ))}
      </div>
    </div>);
}

export default observer(SideBar)
