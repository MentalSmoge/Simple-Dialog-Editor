import Select from "react-select";
import { observer } from 'mobx-react-lite';
import { Handle, Position } from "reactflow";
import { rowDisplayProps } from "./types";
import Store from '../store/VariablesStore';
import "./ChoiceRow.css"



function ChoiceRow({id, data, renderDelete, position, deleteFunc} : rowDisplayProps) {

  const getStyle = (index : number) => {
    return { top: 38 * index + 29 };
  }

  const optionsCompare = [
    { value: '>', label: '>' },
    { value: '=', label: '=' },
    { value: '<', label: '<' }
  ]

  return(
  <div className="content" key={id}>
      <Handle
      type="source"
      position={Position.Right}
      id={`handle-${id}`}
      style={getStyle(position)}
      />
      <Select value={data.firstVar} options={Store.variables} className='nodrag child'/>
      <Select components={{DropdownIndicator:() => null, IndicatorSeparator:() => null}} options={optionsCompare} isSearchable={false} defaultValue={optionsCompare[1]} className='nodrag child' />
      <Select options={Store.variables} className='nodrag child' />
      {renderDelete ? (
        <button className='nodrag child' type='button' onClick={() => deleteFunc(id)}>Удалить</button>) : (<div/>)}
  </div>
  );
}

export default observer(ChoiceRow);
