import { memo, type FC, type CSSProperties, useCallback } from 'react';
import { Handle, Position, type NodeProps, NodeResizer } from 'reactflow';
import { useState } from 'react';

import TextEditor from '../TextEditor';
import './TextNode.css';

const sourceHandleStyleA: CSSProperties = {};

// eslint-disable-next-line react/function-component-definition
const TextNode: FC<NodeProps> = ({ data, xPos, yPos }) => {
  const [textContent, setTextContent] = useState(data.text);
  const sas = useCallback((newText: string) => {
    setTextContent(newText);
  }, [setTextContent]); // Array of dependencies for which the memoization should update
  function handleEditClick() {

  }
  return (
    <div>
      {/* <NodeResizer></NodeResizer> */}
      <Handle type="target" position={Position.Left} />
      <p className='textInNode'>{textContent}</p>

      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={sourceHandleStyleA}
      />
      <TextEditor text = {(textContent)} func = {sas}/>
    </div>
  );
};

export default memo(TextNode);
