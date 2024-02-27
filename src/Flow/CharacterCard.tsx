import Select from "react-select";
import { Handle, Position } from "reactflow";
import "./CharacterCard.css"
import ProportionalImage from "./Components/ProportionalImage";

export type DialogFileData = {
  /**
   * Did user cancel dialog?
   */
  cancelled: boolean
  /**
   * Array of file paths that user selected
   */
  filePaths: string[]
}

function CharacterCard() {
  async function OpenPortrait() {
    const files: DialogFileData = await window.electron.showDialog()
console.log('user files', files)
  }
  return(
  <div className="CharacterCard-container">
    <button type='button' onClick={OpenPortrait}>Выбрать портрет</button>
    <ProportionalImage src='file:///D:\Документы и прочее\Pictures\novice.jpg' />
  </div>
  );
}

export default CharacterCard;
