import { type FC } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import { observer } from 'mobx-react-lite';

import './PlayerChoiceNode.css';
import FlowStore from '../../components/EditorField/FlowStore';
import PlayerChoiceRow from './components/PlayerChoiceRow';


// eslint-disable-next-line react/function-component-definition
const PlayerChoiceNode: FC<NodeProps> = ({ id, data }) => {
  return (
    <div className='PlayerChoice-container'>
      <Handle type="target" position={Position.Left} />
      <div className='PlayerChoice-wrapper'>
      {data.rows.map((row, index) => (
          <PlayerChoiceRow id={id} key={row.idOfRow} idOfRow={row.idOfRow} data={row.data} position={index} renderDelete={data.rows.length > 1}/>
        ))}
      </div>
        <button type="button" className='PlayerChoice-buttonInChoice button_neutral nodrag' onClick={() => FlowStore.addPlayerChoiceRow(id)}>Добавить выбор</button>
    </div>
  );
};

export default observer(PlayerChoiceNode);
