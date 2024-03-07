import Select, { SingleValue } from "react-select";
import { memo, type FC, type CSSProperties } from 'react';
import { Handle, Position, type NodeProps, useStore, NodeResizer, NodeToolbar } from 'reactflow';
import { useState } from 'react';

import t from "../../store/TextEditorStore"
import './TextNode.css';
import { CharacterLabel } from "../types";
import DefaultInput from "../Components/DefaultInput";
import CharacterCard from "../CharacterCard";
import LimitedHandle from "./LimitedHandle";
import { observer } from "mobx-react-lite";
import FlowStore from "../../store/FlowStore";
import CharacterStore from "../../store/CharacterStore";


// eslint-disable-next-line react/function-component-definition
const TextNode: FC<NodeProps> = ({ id, data }) => {
  const resetSelectedElements = useStore(a => a.resetSelectedElements)
  function handleEditClick() {
    resetSelectedElements();
    t.openEditor(data.text, id);
  }
  const [character, setCharacter] = useState<CharacterLabel|undefined|null>()
  function changeCharacter(newSelection : { value: string | undefined, label: string | undefined }) {
    if (newSelection.value === undefined && newSelection.label === undefined) {
      setCharacter(undefined);
      return;
    }
    setCharacter({value: newSelection.value, label: newSelection.label});
  }

  return (
    <div className='TextNode-container'>

      <NodeToolbar position={Position.Top} >
        <button className='TextNode-button nodrag' type='button' onClick={() => handleEditClick()}>Изменить текст</button>
      </NodeToolbar>
      <Handle type="target" position={Position.Left} />
      <LimitedHandle type="source" position={Position.Right} isConnectable={1} />

      <Select isClearable onChange={(val) => {FlowStore.updateCharacterInNode(id, val?.value)}} defaultValue={CharacterStore.getCharacterLabel(data?.character?.id)} value={character} options={CharacterStore.character_options} className='nodrag' />

      {character!==undefined && <> <CharacterCard/> </>}

      <div className='TextNode-wrapper'>
        <DefaultInput textContent={data.text} readOnly/>
      </div>
    </div>
  );
};

export default observer(TextNode);
