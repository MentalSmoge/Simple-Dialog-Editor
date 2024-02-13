import Select from "react-select";
import { Handle } from "reactflow";

interface ChoiceRowProps {
  index : number;
}

function ChoiceRow({sas} : ChoiceRowProps) {
  return(
  <>
      <Handle
      key={index}
      type="source"
      position={Position.Right}
      id={`handle-${index}`}
      style={getStyle(index)}
      />
      <Select options={options} className='nodrag child'/>
      <Select components={{DropdownIndicator:() => null, IndicatorSeparator:() => null}} options={optionsCompare} isSearchable={false} defaultValue={optionsCompare[1]} className='nodrag child' />
      <Select options={options} className='nodrag child' />
      {handleCount > 2 ? (
        <button className='nodrag child' type='button' onClick={() => deleteHandle("handle-2")}>Удалить</button>) : (<div/>)}

  </>
  );
}

export default ChoiceRow;
