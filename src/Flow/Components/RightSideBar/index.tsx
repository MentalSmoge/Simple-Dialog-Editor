import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import "./RightSideBar.css"
import DialogsStore from "../../../store/DialogsStore";
import SideBarButton from "./RightSideBar-button";
import AddDialogButton from "../AddDialogModal/AddDialogButton";
import { CSSTransition } from "react-transition-group";
import CharacterStore from "../../../store/CharacterStore";
import VariablesStore from "../../../store/VariablesStore";


// eslint-disable-next-line react/function-component-definition
const RightSideBar = () => {
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState(1)
  return (
    <>
      <button className="RightSideBar-reveal-button button_neutral" type="button" onClick={() => {setOpen(!open)}} >Reveal</button>
      <CSSTransition
        in={open}
        timeout={500}
        classNames="circle"
        mountOnEnter
        unmountOnExit
      >

        <div className="RightSideBar">
          <div className="RightSideBar-buttons-row">
            <button type="button" className= {category===1 ? "RightSideBar-selector button_neutral highlight" : "RightSideBar-selector button_neutral"} onClick={() => setCategory(1)} >Персонажи</button>
            <button type="button" className= {category===2 ? "RightSideBar-selector button_neutral highlight" : "RightSideBar-selector button_neutral"} onClick={() => setCategory(2)}>Переменные</button>
          </div>
            <div className="RightSideBar-wrapper">
              {category === 1 && CharacterStore.characters.map((character, index) => (
                <button type="button">{character.name}</button>
              ))}
              {category === 2 && VariablesStore.variables.map((variable, index) => (
                <button type="button">{variable.label}</button>
              ))}

            </div>
            <AddDialogButton />
        </div>
      </CSSTransition>


    </>
  );
}

export default observer(RightSideBar)
