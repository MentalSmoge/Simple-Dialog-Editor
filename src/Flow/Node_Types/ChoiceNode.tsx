import { type FC } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import { observer } from 'mobx-react-lite';

import './ChoiceNode.css';
import ChoiceRow from '../ChoiceRow';
import { rowProps } from '../types';
import Store from '../../store/VariablesStore';
import FlowStore from '../../store/FlowStore';


// eslint-disable-next-line react/function-component-definition
const ChoiceNode: FC<NodeProps> = ({ id, data }) => {
  const testButton = () => {
    console.log(FlowStore.edges)
    // console.log(reactFlow.toObject())
    // Store.addVar({label:"sas", value: "Sas"})
  }

  return (
    <div className='container'>
      <Handle type="target" position={Position.Left} />
      <div className='wrapper'>
      {data.rows.map((row, index) => (
          <ChoiceRow id={id} key={row.idOfRow} idOfRow={row.idOfRow} data={row.data} position={index} renderDelete={data.rows.length > 2}/>
        ))}
      </div>
        <button type="button" className='buttonInChoice button_neutral' onClick={() => FlowStore.addRow(id)}>Добавить условие</button>
        <button type="button" className='buttonInChoice button_neutral' onClick={testButton}>Тестовая</button>

    </div>
  );
};

export default observer(ChoiceNode);
