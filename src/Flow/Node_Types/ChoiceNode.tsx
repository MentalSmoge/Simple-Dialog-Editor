import { memo, type FC, useCallback } from 'react';
import { Handle, Position, type NodeProps, useReactFlow, useUpdateNodeInternals } from 'reactflow';
import { useState } from 'react';

import './ChoiceNode.css';
import ChoiceRow from '../ChoiceRow';
import { rowProps } from '../types';
import Store from '../../store/VariablesStore';


// eslint-disable-next-line react/function-component-definition
const ChoiceNode: FC<NodeProps> = ({ id, data }) => {

  const reactFlow = useReactFlow();

  const updateNodeInternals = useUpdateNodeInternals();

  const testButton = () => {
    // console.log(reactFlow.toObject())
    Store.addVar({label:"sas", value: "Sas"})
  }

  const addRow = useCallback(() => {
    setIncrement(increment + 1)
    const newElement : rowProps = {
      idOfRow: increment,
      data: {
        firstVar: undefined,
        secondVar: { value: '=', label: '=' },
        thirdVar: undefined
      }
    };

    setRows([...rows, newElement])

    updateNodeInternals(id);

  }, [id, increment, rows, updateNodeInternals]);

  const deleteRow = (Id : number) => {
    const result = reactFlow.getEdges().filter(item => item.source !== id || item.sourceHandle !== `handle-${Id}`);
    reactFlow.setEdges(result);
    setRows(rows.filter(a => a.idOfRow !== Id))
    updateNodeInternals(id);

  };
  const changeVar = (Id : number, varType : String, newValue : { value: string, label: string }) => {
    const result = rows.filter(item => item.idOfRow === Id);
    switch (varType) {
      case "first":
        result[0].data.firstVar = newValue;
        break;
      case "second":
        result[0].data.secondVar = newValue;
        break;
      case "third":
        result[0].data.thirdVar = newValue;
        break;

      default:
        break;
    }

  }

  return (
    <div className='container'>
      <Handle type="target" position={Position.Left} />
      <div className='wrapper'>
      {rows.map((row, index) => (
          <ChoiceRow key={row.idOfRow} idOfRow={row.idOfRow} data={row.data} changeVar={changeVar} position={index} deleteFunc={deleteRow} renderDelete={rows.length > 2}/>
        ))}
      </div>
        <button type="button" className='buttonInChoice' onClick={addRow}>Добавить условие</button>
        <button type="button" className='buttonInChoice' onClick={testButton}>Тестовая</button>

    </div>
  );
};

export default memo(ChoiceNode);
