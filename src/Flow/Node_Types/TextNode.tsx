import { memo, type FC } from 'react';
import { Handle, Position, type NodeProps, useStore, NodeResizer } from 'reactflow';
import { useState } from 'react';

import t from "../../store/TextEditorStore"
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
  return (
      <div className='container-text'>
      <NodeResizer color="#ff0071" handleStyle={{
        width:10,
        height:10

      }}
      lineStyle={{
        borderWidth:2
        }} isVisible={selected} minWidth={125} minHeight={100} />
      <Handle type="target" position={Position.Left} />
      <div className='textContainer'>
        <textarea value={textContent} readOnly className='textInNode nodrag nowheel'/>
        <Handle
          type="source"
          position={Position.Right}
        />

      </div>
      <button className='nodrag textButton' type='button' onClick={() => handleEditClick()}>Изменить текст</button>
    </div>
  );
};

export default memo(TextNode);
