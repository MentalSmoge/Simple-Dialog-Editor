import { memo, type FC, type CSSProperties, useCallback, Fragment } from 'react';
import { Handle, Position, type NodeProps, useReactFlow, Node, useNodeId, useStore, useUpdateNodeInternals } from 'reactflow';
import { useState } from 'react';
import Select from 'react-select'

import t from "../../store/VariablesStore"
import './ChoiceNode.css';
import ChoiceRow from '../ChoiceRow';
import { rowProps } from '../types';


// eslint-disable-next-line react/function-component-definition
const ChoiceNode: FC<NodeProps> = ({ id, data, xPos, yPos }) => {
  const reactFlow = useReactFlow();
  const edges = reactFlow.getEdges();

  const [increment, setIncrement] = useState(0);
  const [rows, setRows] = useState<rowProps[]>([]);

  const updateNodeInternals = useUpdateNodeInternals();
  // const randomizeHandleCount = useCallback(() => {
  //   setHandleCount(Math.floor(Math.random() * 10));
  //   updateNodeInternals(id);
  // }, [id, updateNodeInternals]);

  // const addHandle = useCallback(() => {
  //   setHandleCount(handleCount + 1);
  //   updateNodeInternals(id);
  // }, [handleCount, id, updateNodeInternals]);

  const testButton = () => {
    const updatedList = rows.map(item =>
      {
        const newData = item.data
        newData.firstVar = "saaas"
        return {...item, data: newData};
      });

    setRows(updatedList); // set state to new object with updated list
  }
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'Очень длинная переменная', label: 'Очень длинная переменная' }
  ]
  const addRow = useCallback(() => {
    setIncrement(increment + 1)
    const newElement : rowProps = {
      id: increment,
      data: {
        firstVar: options[0],
        secondVar: options[0]
      }
    };

    setRows([...rows, newElement])

    updateNodeInternals(id);

  }, [id, increment, rows, updateNodeInternals]);


  const optionsCompare = [
    { value: '>', label: '>' },
    { value: '=', label: '=' },
    { value: '<', label: '<' }
  ]
  const getStyle = (index : number) => {
    return { top: 38 * index + 29 };
  }
  const deleteRow = (Id : number) => {
    updateNodeInternals(id);
    const edge = reactFlow.getEdges().filter(variant => variant.source === id && variant.sourceHandle === `handle-${Id}`)
    console.log(edge)

    const result = edges.filter(item => !edge.includes(item));
    console.log(result)

    reactFlow.setEdges(result);
    setRows(rows.filter(a => a.id !== Id))
    updateNodeInternals(id);

  };

  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <div className='wrapper'>
      {rows.map((row, index) => (
          <ChoiceRow key={row.id} id={row.id} data={row.data} position={index} deleteFunc={deleteRow} renderDelete={rows.length > 2}/>
        ))}
        {/* {Array.from({ length: handleCount }).map((_, index) => (
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
        ))} */}
      </div>
      {/* <div>
        <button type="button" onClick={randomizeHandleCount}>Randomize handle count</button>
        <p>There are {handleCount} handles on this node.</p>
      </div> */}
      <div>
        <button type="button" onClick={addRow}>Add handle</button>
      </div>

    </div>
  );
};

export default memo(ChoiceNode);
