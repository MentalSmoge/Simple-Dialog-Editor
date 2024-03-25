import { type FC } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import { observer } from 'mobx-react-lite';

import './PlayerChoiceNode.css';
import { rowProps } from '../types';
import Store from '../../store/VariablesStore';
import FlowStore from '../../store/FlowStore';
import PlayerChoiceRow from '../PlayerChoiceRow';


// eslint-disable-next-line react/function-component-definition
const PlayerChoiceNode: FC<NodeProps> = ({ id, data }) => {
  const testButton = () => {
    console.log(FlowStore.edges)
    // console.log(reactFlow.toObject())
    // Store.addVar({label:"sas", value: "Sas"})
  }

  return (
    <div className='PlayerChoice-container'>
      <Handle type="target" position={Position.Left} />
      <div className='PlayerChoice-wrapper'>
      {data.rows.map((row, index) => (
          <PlayerChoiceRow id={id} key={row.idOfRow} idOfRow={row.idOfRow} data={row.data} position={index} renderDelete={data.rows.length > 1}/>
        ))}
      </div>
        <button type="button" className='PlayerChoice-buttonInChoice button_neutral nodrag' onClick={() => FlowStore.addPlayerChoiceRow(id)}>Добавить выбор</button>
        {/* <button type="button" className='buttonInChoice button_neutral' onClick={testButton}>Тестовая</button> */}

    </div>
  );
};

export default observer(PlayerChoiceNode);
