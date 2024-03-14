import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import "./RightSideBar.css"
import DialogsStore from "../../../store/DialogsStore";
import SideBarButton from "./RightSideBar-button";
import AddDialogButton from "../AddDialogModal/AddDialogButton";
import { CSSTransition } from "react-transition-group";
import CharacterStore from "../../../store/CharacterStore";
import VariablesStore from "../../../store/VariablesStore";
import DeleteModalStore from "../../../store/DeleteModalStore";
import EditModalCharacterStore from "../../../store/EditModalCharacterStore";
import EditModalVariableStore from "../../../store/EditModalVariableStore";
import AddCharacterButton from "../AddCharacterModal/AddCharacterButton";
import AddVarButton from "../AddVarModal/AddVarButton";


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
                <button className="RightSideBar-button-character button_neutral" type="button" onContextMenu={
                  (e) => {
                    DeleteModalStore.setCurrentId(character.id)
                    EditModalCharacterStore.setCurrentId(character.id)
                  }}>{character.name}</button>
              ))}
              {category === 2 && VariablesStore.variables.map((variable, index) => (
                <button className="RightSideBar-button-variable button_neutral" type="button" onContextMenu={
                  (e) => {
                    DeleteModalStore.setCurrentId(variable.id)
                    EditModalVariableStore.setCurrentId(variable.id)
                  }}>{variable.label}</button>
              ))}

            </div>
            {category === 1 &&
            <AddCharacterButton />}
            {category === 2 &&
            <AddVarButton />}
        </div>
      </CSSTransition>


    </>
  );
}

export default observer(RightSideBar)
