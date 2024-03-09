import Select from "react-select";
import { Handle, Position } from "reactflow";
import "./CharacterCard.css"
import ProportionalImage from "./Components/ProportionalImage";
import { useState } from "react";
import { DialogFileData } from "./types";
import { observer } from "mobx-react-lite";
import CharacterStore from "../store/CharacterStore";
import FlowStore from "../store/FlowStore";



function CharacterCard({id}) {
  const picture = FlowStore.getNode(id)?.data?.portrait

  async function OpenPortrait() {
    console.log("Clicked Open Portrait")
    const files: DialogFileData = await window.electron.showOpenDialog("D:\\Downloads Edge")
    if (files.canceled === false) {
      FlowStore.updatePortraitInNode(id, files.filePaths[0])
      console.log("not cancelled")
      console.log(files.filePaths[0])
    }
  }
  return(
  <div className="CharacterCard-container">
    <ProportionalImage image={picture} defaultImage={CharacterStore.getCharacter(FlowStore.getNode(id)?.data?.character?.id)?.defaultPortrait}/>
    <button className="CharacterCard-button nodrag button_neutral" type='button' onClick={OpenPortrait}>Выбрать портрет</button>
  </div>
  );
}

export default observer(CharacterCard);
