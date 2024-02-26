import Select from "react-select";
import { Handle, Position } from "reactflow";
import "./CharacterCard.css"
import ProportionalImage from "./Components/ProportionalImage";


function CharacterCard() {

  return(
  <div className="CharacterCard-container">
    <textarea cols={30}/>
    <ProportionalImage src='file:///D:/Downloads Edge/MyAva.jpg' />
  </div>
  );
}

export default CharacterCard;
