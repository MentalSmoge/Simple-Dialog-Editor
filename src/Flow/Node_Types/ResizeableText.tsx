import { memo, type FC, type CSSProperties } from 'react';
import { Handle, Position, type NodeProps, NodeResizer } from 'reactflow';
import { useState } from 'react';

const sourceHandleStyleA: CSSProperties = { left: 50 };
const sourceHandleStyleB: CSSProperties = {
  right: 50,
  left: 'auto',
};

// eslint-disable-next-line react/function-component-definition
const ResizeableText: FC<NodeProps> = ({ data, xPos, yPos }) => {
  const [textContent, setTextContent] = useState(data.text);
  return (
    <div>
      {/* <NodeResizer /> */}
      <Handle type="target" position={Position.Top} />
      {/* <textarea
        id="text"
        name="text"
        onChange={(e) => {
          setTextContent(e.target.value);
          data.text = e.target.value;
        }}
        value={textContent}
        className="nodrag"
      /> */}
      <p className="fillTheVoid">
        <strong>Text editor:</strong>{' '}
        <span className="textarea nodrag" role="textbox" contentEditable></span>
      </p>
      <div>Another</div>

      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={sourceHandleStyleA}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={sourceHandleStyleB}
      />
    </div>
  );
};

export default memo(ResizeableText);
