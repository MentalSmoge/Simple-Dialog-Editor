import { memo, type FC, useCallback } from 'react';
import { Handle, Position, type NodeProps, useReactFlow, useUpdateNodeInternals } from 'reactflow';
import { useState } from 'react';

import './ChoiceNode.css';
import ChoiceRow from '../ChoiceRow';
import { rowProps } from '../types';
import { ColumnDef, createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';


const columns = [
  {
    accessorKey: 'first',
    header: 'First',
    cell: (props) => <p>{props.getValue()}</p>
  },
  {
    accessorKey: 'second',
    header: 'Second',
    cell: (props) => <p>{props.getValue()}</p>
  },

  {
    accessorKey: 'third',
    header: 'Third',
    cell: (props) => <p>{props.getValue()}</p>
  },
]

// eslint-disable-next-line react/function-component-definition
const ChoiceNode: FC<NodeProps> = ({ id }) => {
  const reactFlow = useReactFlow();
  const initialValue = [{
    idOfRow: 0,
    data: {
      firstVar: undefined,
      secondVar: { value: '=', label: '=' },
      thirdVar: undefined
    }
  }, {
    idOfRow: 1,
    data: {
      firstVar: undefined,
      secondVar: { value: '=', label: '=' },
      thirdVar: undefined
    }
  }]
  const [increment, setIncrement] = useState(2);
  const [rows, setRows] = useState<rowProps[]>(initialValue);

  const updateNodeInternals = useUpdateNodeInternals();

  const testButton = () => {
    rows.forEach(element => {
      console.log(`${element.idOfRow} ${element.data.firstVar?.label} ${element.data.secondVar?.label} ${element.data.thirdVar?.label}`)
    });
  }
  type rowType = {
    first: string
    second: string
    third: number
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
    <div>
      <Handle type="target" position={Position.Left} />
      <div className='wrapper'>
      {rows.map((row, index) => (
          <ChoiceRow key={row.idOfRow} idOfRow={row.idOfRow} data={row.data} changeVar={changeVar} position={index} deleteFunc={deleteRow} renderDelete={rows.length > 2}/>
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
