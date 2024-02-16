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

  const [increment, setIncrement] = useState(0);
  const [rows, setRows] = useState<rowProps[]>([]);

  const updateNodeInternals = useUpdateNodeInternals();

  const testButton = () => {

  }
const options = [
    { value: '', label: '' },
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'Очень длинная переменная', label: 'Очень длинная переменная' }
  ]
  const addRow = useCallback(() => {
    setIncrement(increment + 1)
    const newElement : rowProps = {
      idOfRow: increment,
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
    const result = reactFlow.getEdges().filter(item => item.source !== id || item.sourceHandle !== `handle-${Id}`);
    console.log(result)

    reactFlow.setEdges(result);
    setRows(rows.filter(a => a.idOfRow !== Id))
    updateNodeInternals(id);

  };

  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <div className='wrapper'>
      {rows.map((row, index) => (
          <ChoiceRow key={row.idOfRow} idOfRow={row.idOfRow} data={row.data} position={index} deleteFunc={deleteRow} renderDelete={rows.length > 2}/>
        ))}
      </div>
      <div>
        <button type="button" onClick={addRow}>Добавить условие</button>
      </div>
      <div>
        <button type="button" onClick={testButton}>Вывести условия</button>
      </div>


    </div>
  );
};

export default memo(ChoiceNode);
