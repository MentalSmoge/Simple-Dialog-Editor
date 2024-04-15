import { observer } from "mobx-react-lite";
import "./CharacterCard.css"
import ProportionalImage from "../ProportionalImage";
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
    <ProportionalImage image={picture} />
    <button className="CharacterCard-button nodrag button_neutral" type='button' onClick={() => OpenPortrait()}>Выбрать портрет</button>
  </div>
  );
}

export default observer(CharacterCard);
