import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import "./RightSideBar.css"
import DialogsStore from "../../../store/DialogsStore";
import SideBarButton from "./RightSideBar-button";
import AddDialogButton from "../AddDialogModal/AddDialogButton";


// eslint-disable-next-line react/function-component-definition
const RightSideBar = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" onClick={() => {setOpen(!open)}} >Reveal</button>
      {open && <div className="RightSideBar">
          <div className="RightSideBar-wrapper">
            {DialogsStore.dialogs.map((dialog, index) => (
              <SideBarButton key={dialog.id} dialog={dialog} />
            ))}
          </div>
          <AddDialogButton />
      </div>
      }

    </>
  );
}

export default observer(RightSideBar)
