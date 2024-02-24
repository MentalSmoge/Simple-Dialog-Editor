import Select from "react-select";
import { memo, type FC, type CSSProperties } from 'react';
import { Handle, Position, type NodeProps, useStore, NodeResizer } from 'reactflow';
import { useState } from 'react';

import Store from "../../store/CharacterStore"
import './TextNode.css';


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
  const [character, setCharacter] = useState()

  return (
    <div className='TextNode-container'>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <NodeResizer color="#ff0071" handleStyle= {handleStyle} lineStyle={lineStyle} isVisible={selected} minWidth={125} minHeight={125} />

      <Select value={character} options={Store.character_options} className='nodrag' />

      <div className='TextNode-wrapper'>
        <textarea value={textContent} readOnly className='TextNode-textarea nodrag nowheel'/>
        <button className='TextNode-button nodrag' type='button' onClick={() => handleEditClick()}>Изменить текст</button>
      </div>
    </div>
  );
};

export default memo(TextNode);
