import { memo, type FC, type CSSProperties, useCallback, Fragment } from 'react';
import { Handle, Position, type NodeProps, useReactFlow, Node, useNodeId, useStore, useUpdateNodeInternals } from 'reactflow';
import { useState } from 'react';
import Select from 'react-select'

import t from "../../store/VariablesStore"
import './ChoiceNode.css';
import ChoiceRow from '../ChoiceRow';

// eslint-disable-next-line react/function-component-definition
const ChoiceNode: FC<NodeProps> = ({ id, data, xPos, yPos }) => {
  const reactFlow = useReactFlow();
  const edges = reactFlow.getEdges();

  const [increment, setIncrement] = useState(0);
  const [rows, setRows] = useState([]);

  const updateNodeInternals = useUpdateNodeInternals();
  const [handleCount, setHandleCount] = useState(4);
  const randomizeHandleCount = useCallback(() => {
    setHandleCount(Math.floor(Math.random() * 10));
    updateNodeInternals(id);
  }, [id, updateNodeInternals]);

  const addHandle = useCallback(() => {
    setHandleCount(handleCount + 1);
    updateNodeInternals(id);
  }, [handleCount, id, updateNodeInternals]);

  const addRow = useCallback(() => {
    setIncrement(increment + 1)
    setHandleCount(handleCount + 1);
    const newElement = {
      id: increment
    };

    setRows([...rows, <ChoiceRow />])

    updateNodeInternals(id);


  }, [handleCount, id, updateNodeInternals]);

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'Очень длинная переменная', label: 'Очень длинная переменная' }
  ]
  const optionsCompare = [
    { value: '>', label: '>' },
    { value: '=', label: '=' },
    { value: '<', label: '<' }
  ]
  const getStyle = (index : number) => {
    return { top: 38 * index + 29 };
  }
  const deleteHandle = useCallback((handleId : String) => {
    setHandleCount(handleCount - 1);
    updateNodeInternals(id);
    const edge = edges.filter(variant => variant.source === id && variant.sourceHandle === handleId)

    const result = edges.filter(item => !edge.includes(item));
    reactFlow.setEdges(result);

  }, [edges, handleCount, id, reactFlow, updateNodeInternals]);

  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <div className='wrapper'>
        {Array.from({ length: handleCount }).map((_, index) => (
          <>
            <Handle
            key={index}
            type="source"
            position={Position.Right}
            id={`handle-${index}`}
            style={getStyle(index)}
            />
            <Select options={options} className='nodrag child'/>
            <Select components={{DropdownIndicator:() => null, IndicatorSeparator:() => null}} options={optionsCompare} isSearchable={false} defaultValue={optionsCompare[1]} className='nodrag child' />
            <Select options={options} className='nodrag child' />
            {handleCount > 2 ? (
              <button className='nodrag child' type='button' onClick={() => deleteHandle("handle-2")}>Удалить</button>) : (<div/>)}

          </>
        ))}
      </div>
      <div>
        <button type="button" onClick={randomizeHandleCount}>Randomize handle count</button>
        <p>There are {handleCount} handles on this node.</p>
      </div>
      <div>
        <button type="button" onClick={addHandle}>Add handle</button>
      </div>

    </div>
  );
};

export default memo(ChoiceNode);
