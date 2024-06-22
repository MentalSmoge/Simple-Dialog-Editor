import Select from "react-select";
import { observer } from 'mobx-react-lite';
import Creatable, { useCreatable } from 'react-select/creatable';
import { Handle, Position, useStore } from "reactflow";
import { rowDisplayProps } from "../../../../../Flow/types";
import Store from '../../../../../store/VariablesStore';
import "./PlayerChoiceRow.css"
import LimitedHandleChoice from "../../../HandleTypes/Handle_Branching/LimitedHandleChoice";
import FlowStore from "../../../components/EditorField/FlowStore";
import PlayerChoiceTextEditorModalStore from "../../../Modals/Modal_TextEditor/PlayerChoiceTextEditorModalStore";



function PlayerChoiceRow({id, idOfRow, data, renderDelete, position} : rowDisplayProps) {

  const getStyle = (index : number) => {
    return { top: (54.5) * index + 31 };
  }
  const resetSelectedElements = useStore(a => a.resetSelectedElements)
  function handleEditClick() {
    console.log(data.text, id, idOfRow)
    resetSelectedElements();
    PlayerChoiceTextEditorModalStore.openEditor(data.text, id, idOfRow);
  }

  return(
  <>
      <LimitedHandleChoice type="source"
      position={Position.Right}
      id={`handle-${idOfRow}`}
      style={getStyle(position)}
      isConnectable={1}
      handleid={`handle-${idOfRow}`} />

      <textarea value={data.text} className="nodrag nowheel PlayerChoice-textarea" readOnly rows={3} />

      <button className='nodrag PlayerChoice-child button_neutral PlayerChoice-editButton' type='button' onClick={() => handleEditClick()}>Редактировать</button>

      {renderDelete ? (
        <button className='nodrag PlayerChoice-child deleteButton' type='button' onClick={() => FlowStore.deleteRow(id, idOfRow)}>Удалить</button>) : (<div />)}
  </>
  );
}

export default observer(PlayerChoiceRow);
