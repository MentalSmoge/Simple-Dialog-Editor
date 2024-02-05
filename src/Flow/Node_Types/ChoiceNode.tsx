import { memo, type FC, type CSSProperties, useCallback } from 'react';
import { Handle, Position, type NodeProps, useReactFlow, Node, useNodeId, useStore, useUpdateNodeInternals } from 'reactflow';
import { useState } from 'react';
import Select from 'react-select'

import t from "../../store/VariablesStore"
// import './ChoiceNode.css';
import ChoiceRow from '../ChoiceRow';

// eslint-disable-next-line react/function-component-definition
const ChoiceNode: FC<NodeProps> = ({ id, data, xPos, yPos }) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const [handleCount, setHandleCount] = useState(0);
  const randomizeHandleCount = useCallback(() => {
    setHandleCount(Math.floor(Math.random() * 100));
    updateNodeInternals(id);
  }, [id, updateNodeInternals]);
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  const optionsCompare = [
    { value: '>', label: '>' },
    { value: '=', label: '=' },
    { value: '<', label: '<' }
  ]
  const getStyle = (index : number) => {
    return { top: 38 * index + 19 };
  }

  return (
    <div>
      {/* <NodeResizer></NodeResizer> */}
      <Handle type="target" position={Position.Left} />
      {Array.from({ length: handleCount }).map((_, index) => (
          <ChoiceRow key={index} row={index} />
      ))}

      <div>
        <button onClick={randomizeHandleCount}>Randomize handle count</button>
        <p>There are {handleCount} handles on this node.</p>
      </div>

    </div>
  );
};

export default memo(ChoiceNode);
