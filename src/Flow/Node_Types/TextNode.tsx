import { memo, type FC, type CSSProperties } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import { useState } from 'react';

import TextEditor from '../TextEditor';

const sourceHandleStyleA: CSSProperties = {};

// eslint-disable-next-line react/function-component-definition
const TextNode: FC<NodeProps> = ({ data, xPos, yPos }) => {
  const [textContent, setTextContent] = useState(data.text);
  function handleEditClick() {

  }
  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <p>{textContent}</p>

      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={sourceHandleStyleA}
      />
      <TextEditor></TextEditor>
    </div>
  );
};

export default memo(TextNode);
