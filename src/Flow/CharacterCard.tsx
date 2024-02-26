import Select from "react-select";
import { Handle, Position } from "reactflow";
import "./CharacterCard.css"
import ProportionalImage from "./Components/ProportionalImage";


function CharacterCard() {

  return(
  <div className="CharacterCard-container">
    <ProportionalImage src='file:///D:\Документы и прочее\Pictures\novice.jpg' />
  </div>
  );
}

export default CharacterCard;
