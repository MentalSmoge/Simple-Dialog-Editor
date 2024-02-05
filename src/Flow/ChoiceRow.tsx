import { memo } from 'react';
import { Handle, Position, type NodeProps} from 'reactflow';
import Select from 'react-select'
import "./ChoiceRow.css";

// eslint-disable-next-line react/function-component-definition
const ChoiceRow = ({row}) => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  const optionsCompare = [
    { value: '>', label: '>' },
    { value: '=', label: '=' },
    { value: '<', label: '<' }
  ]
  const getStyle = () => {
    console.log(38 * row + 19)
    return { top: 38 * row + 19 };
  }
  return (
    <div className='container'>
        <Select className='nodrag' options={options} />
        <Select className='nodrag' options={optionsCompare} defaultValue={optionsCompare[1]}/>
        <Select className='nodrag' options={options} />
        <Handle
          type="source"
          position={Position.Right}
          id={`handle-${row}`}
          style={getStyle()}
        />
    </div>
  );
};

export default memo(ChoiceRow);
