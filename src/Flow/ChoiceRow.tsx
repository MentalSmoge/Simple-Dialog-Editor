import Select from "react-select";
import { observer } from 'mobx-react-lite';
import { Handle, Position } from "reactflow";
import { rowDisplayProps } from "./types";
import Store from '../store/VariablesStore';
import "./ChoiceRow.css"



function ChoiceRow({idOfRow, data, renderDelete, position, deleteFunc, changeVar} : rowDisplayProps) {

  const getStyle = (index : number) => {
    return { top: (38+8) * index + 29 };
  }

  const optionsCompare = [
    { value: '>', label: '>' },
    { value: '=', label: '=' },
    { value: '<', label: '<' }
  ]

  return(
  <>
      <Handle
      type="source"
      position={Position.Right}
      id={`handle-${idOfRow}`}
      style={getStyle(position)}
      />
      {/* Первая переменная */}
      <Select onChange={(val) => changeVar(idOfRow, 'first', val)} value={data.firstVar} options={Store.variables} className='nodrag child coolselect' styles={{
    control: (baseStyles, state) => ({
          ...baseStyles,
          borderRadius:"8px 0 0 8px",
        }),
      }}/>
      {/* Сравнение */}
      <Select onChange={(val) => changeVar(idOfRow, 'second', val)} components={{DropdownIndicator:() => null, IndicatorSeparator:() => null}} options={optionsCompare} isSearchable={false} defaultValue={optionsCompare[1]} className='nodrag child coolselect' styles={{
    control: (baseStyles, state) => ({
          ...baseStyles,
          borderRadius:"0",
        }),
      }}/>
      {/* Вторая переменная */}
      <Select onChange={(val) => changeVar(idOfRow, 'third', val)} options={Store.variables} className='nodrag child coolselect' styles={{
    control: (baseStyles, state) => ({
          ...baseStyles,
          borderRadius:"0 8px 8px 0",
        }),
      }}/>
      {renderDelete ? (
        <button className='nodrag child deleteButton' type='button' onClick={() => deleteFunc(idOfRow)}>Удалить</button>) : (<div />)}
  </>
  );
}

export default observer(ChoiceRow);
