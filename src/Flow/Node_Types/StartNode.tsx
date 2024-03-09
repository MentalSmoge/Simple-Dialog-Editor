import { type FC } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import { observer } from 'mobx-react-lite';
import "./StartNode.css"



// eslint-disable-next-line react/function-component-definition
const StartNode: FC<NodeProps> = ({ id, data }) => {
  return (
    <div className='StartNode-container'>
      <p className='StartNode-text'>Start</p>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default observer(StartNode);
