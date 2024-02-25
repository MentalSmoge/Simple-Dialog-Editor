import Select, { SingleValue } from "react-select";
import { memo, type FC, type CSSProperties } from 'react';
import { Handle, Position, type NodeProps, useStore, NodeResizer } from 'reactflow';
import { useState } from 'react';

import Store from "../../store/CharacterStore"
import t from "../../store/TextEditorStore"
import './TextNode.css';
import { CharacterLabel } from "../types";
import DefaultInput from "../Components/DefaultInput";


// eslint-disable-next-line react/function-component-definition
const TextNode: FC<NodeProps> = ({ data, selected }) => {
  const resetSelectedElements = useStore(a => a.resetSelectedElements)
  const [textContent, setTextContent] = useState(data.text);
  function applyTextChange(newText : string) {
    setTextContent(newText);
  }
  function handleEditClick() {
    resetSelectedElements();
    t.openEditor(textContent, applyTextChange);
  }
  const handleStyle: CSSProperties = {
    width:10,
    height:10 }

  const lineStyle: CSSProperties ={
    borderWidth:2
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
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <NodeResizer color="#ff0071" handleStyle= {handleStyle} lineStyle={lineStyle} isVisible={selected} minWidth={125} minHeight={125} />

      <Select isClearable onChange={(val) => changeCharacter({label:val?.label, value:val?.value})} value={character} options={Store.character_options} className='nodrag' />
      {character!==undefined && <h2>sas!!!</h2>}

      <div className='TextNode-wrapper'>
        <DefaultInput textContent={textContent} readOnly/>
        <button className='TextNode-button nodrag' type='button' onClick={() => handleEditClick()}>Изменить текст</button>
      </div>
    </div>
  );
};

export default memo(TextNode);
