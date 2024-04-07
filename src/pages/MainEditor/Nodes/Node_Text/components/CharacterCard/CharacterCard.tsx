import { observer } from "mobx-react-lite";
import "./CharacterCard.css"
import ProportionalImage from "../ProportionalImage";
import { DialogFileData } from "../../../../../../Flow/types";
import CharacterStore from "../../../../../../store/CharacterStore";
import FlowStore from "../../../../components/EditorField/FlowStore";

type CharacterCardProps = {
  id : string,
  OpenPortrait : Function
}

function CharacterCard({id, OpenPortrait} : CharacterCardProps) {
  const picture = FlowStore.getNode(id)?.data?.portrait

  return(
  <div className="CharacterCard-container">
    <ProportionalImage image={picture} defaultImage={CharacterStore.getCharacter(FlowStore.getNode(id)?.data?.character?.id)?.defaultPortrait}/>
    <button className="CharacterCard-button nodrag button_neutral" type='button' onClick={() => OpenPortrait()}>Выбрать портрет</button>
  </div>
  );
}

export default observer(CharacterCard);
