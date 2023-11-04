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
    <>
      <NodeResizer />
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Text:</label>
        <textarea
          id="text"
          name="text"
          onChange={(e) => {
            setTextContent(e.target.value);
            data.text = e.target.value;
          }}
          value={textContent}
          className="nodrag"
        />
        <div>
          Label: <strong>{data.label}</strong>
        </div>
        <div>
          Position:{' '}
          <strong>
            {xPos.toFixed(2)},{yPos.toFixed(2)}
          </strong>
        </div>
      </div>

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
    </>
  );
};

export default memo(ResizeableText);
