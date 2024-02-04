import { memo, type FC, type CSSProperties } from 'react';
import { Handle, Position, type NodeProps, useReactFlow, Node, useNodeId, useStore } from 'reactflow';
import { useState } from 'react';

import t from "../../store/TextEditorStore"
import './TextNode.css';

const sourceHandleStyleA: CSSProperties = {};

// eslint-disable-next-line react/function-component-definition
const ChoiceNode: FC<NodeProps> = ({ data, xPos, yPos }) => {
  const id = useNodeId() as string;
  const resetSelectedElements = useStore(a => a.resetSelectedElements)
  const reactFlow = useReactFlow();
  const [textContent, setTextContent] = useState(data.text);
  function applyTextChange(newText : string) {
    setTextContent(newText);
  }
  function handleEditClick() {
    resetSelectedElements();
    const getNode = reactFlow.getNode(id) as Node
    t.openEditor(textContent, applyTextChange);
  }
  return (
    <div>
      {/* <NodeResizer></NodeResizer> */}
      <Handle type="target" position={Position.Left} />
      <p className='textInNode'>{textContent}</p>
      <button className='nodrag' onClick={() => handleEditClick()}>Open Modal</button>
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
