import { type FC } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import { observer } from 'mobx-react-lite';

import './NodeBranch.css';
import ChoiceRow from './components/ChoiceRow';
import FlowStore from '../../components/EditorField/FlowStore';


// eslint-disable-next-line react/function-component-definition
const NodeBranch: FC<NodeProps> = ({ id, data }) => {
  return (
    <div className='container'>
      <Handle type="target" position={Position.Left} />
      <div className='wrapper'>
      {data.rows.map((row, index:number) => (
          <ChoiceRow id={id} key={row.idOfRow} idOfRow={row.idOfRow} data={row.data} position={index} renderDelete={data.rows.length > 2}/>
        ))}
      </div>
        <button type="button" className='buttonInChoice button_neutral nodrag' onClick={() => FlowStore.addRow(id)}>Добавить условие</button>
        {/* <button type="button" className='buttonInChoice button_neutral' onClick={testButton}>Тестовая</button> */}

    </div>
  );
};

export default observer(NodeBranch);
