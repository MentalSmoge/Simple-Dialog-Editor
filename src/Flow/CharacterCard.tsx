import Select from "react-select";
import { Handle, Position } from "reactflow";
import "./CharacterCard.css"
import ProportionalImage from "./Components/ProportionalImage";
import { useState } from "react";
import { DialogFileData } from "./types";



function CharacterCard({character}) {
  const [currentPicture, setCurrentPicture] = useState<string>()
  async function OpenPortrait() {
    const files: DialogFileData = await window.electron.showOpenDialog("D:\\Downloads Edge")
    if (files.cancelled) {
      return;
    }
    setCurrentPicture(files.filePaths[0])
  }
  return(
  <div className="CharacterCard-container">
    <ProportionalImage src={currentPicture}/>
    <button className="CharacterCard-button" type='button' onClick={OpenPortrait}>Выбрать портрет</button>
  </div>
  );
}

export default CharacterCard;
