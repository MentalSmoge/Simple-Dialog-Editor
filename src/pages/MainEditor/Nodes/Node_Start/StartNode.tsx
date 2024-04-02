import { type FC } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import { observer } from 'mobx-react-lite';
import "./StartNode.css"
import LimitedHandle from '../../HandleTypes/Handle_Default/LimitedHandle';



// eslint-disable-next-line react/function-component-definition
const StartNode: FC<NodeProps> = ({ id, data }) => {
  return (
    <div className='StartNode-container'>
      <p className='StartNode-text'>Start</p>
      <LimitedHandle type="source" position={Position.Right} isConnectable={1} />
    </div>
  );
};

export default observer(StartNode);
