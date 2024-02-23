import { memo, type FC, type CSSProperties } from 'react';
import { Handle, Position, type NodeProps, useStore, NodeResizer } from 'reactflow';
import { useState } from 'react';

import t from "../../store/TextEditorStore"
import './TextNode.css';

const sourceHandleStyleA: CSSProperties = {};

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
    <div className='textContainer'>
      <NodeResizer color="#ff0071" isVisible={selected} minWidth={125} minHeight={100} />
      <Handle type="target" position={Position.Left} />
      <p className='textInNode nodrag nowheel'>{textContent}</p>
      <button className='nodrag textButton' type='button' onClick={() => handleEditClick()}>Open Modal</button>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={sourceHandleStyleA}
      />

    </div>
  );
};

export default memo(TextNode);
