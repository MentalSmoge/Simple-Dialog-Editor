import Select, { SingleValue } from "react-select";
import { memo, type FC, type CSSProperties } from 'react';
import { Handle, Position, type NodeProps, useStore, NodeResizer, NodeToolbar } from 'reactflow';
import { useState } from 'react';

import Store from "../../store/CharacterStore"
import t from "../../store/TextEditorStore"
import './TextNode.css';
import { CharacterLabel } from "../types";
import DefaultInput from "../Components/DefaultInput";
import CharacterCard from "../CharacterCard";
import LimitedHandle from "./LimitedHandle";


// eslint-disable-next-line react/function-component-definition
const TextNode: FC<NodeProps> = ({ data }) => {
  const resetSelectedElements = useStore(a => a.resetSelectedElements)
  const [textContent, setTextContent] = useState(data.text);
  function applyTextChange(newText : string) {
    setTextContent(newText);
    data.text = newText
  }
  function handleEditClick() {
    resetSelectedElements();
    t.openEditor(textContent, applyTextChange);
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
      <Select isClearable onChange={(val) => changeCharacter({label:val?.label, value:val?.value})} value={character} options={Store.character_options} className='nodrag' />
      {character!==undefined && <> <CharacterCard/> </>}

      <div className='TextNode-wrapper'>
        <DefaultInput textContent={textContent} readOnly/>
      </div>
    </div>
  );
};

export default memo(TextNode);
