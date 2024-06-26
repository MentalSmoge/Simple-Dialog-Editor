import Select from "react-select";
import { observer } from 'mobx-react-lite';
import Creatable, { useCreatable } from 'react-select/creatable';
import { Handle, Position } from "reactflow";
import { rowDisplayProps } from "./types";
import Store from '../store/VariablesStore';
import "./ChoiceRow.css"
import LimitedHandleChoice from "./Node_Types/LimitedHandleChoice";
import FlowStore from "../store/FlowStore";



function ChoiceRow({id, idOfRow, data, renderDelete, position} : rowDisplayProps) {

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
      <LimitedHandleChoice type="source"
      position={Position.Right}
      id={`handle-${idOfRow}`}
      style={getStyle(position)}
      isConnectable={1}
      handleid={`handle-${idOfRow}`} />
      {/* Первая переменная */}
      <Select placeholder={<div>Variable...</div>} isClearable onChange={(val) => FlowStore.changeVar(id, idOfRow, 'first', val)} value={data.firstVar} options={Store.variables} className='nodrag child coolselect' styles={{
    control: (baseStyles, state) => ({
          ...baseStyles,
          borderRadius:"8px 0 0 8px",
        }),
      }}/>
      {/* Сравнение */}
      <Select onChange={(val) => FlowStore.changeVar(id, idOfRow, 'second', val)} value={data.secondVar}  components={{DropdownIndicator:() => null, IndicatorSeparator:() => null}} options={optionsCompare} isSearchable={false} defaultValue={optionsCompare[1]} className='nodrag child coolselect' styles={{
    control: (baseStyles, state) => ({
          ...baseStyles,
          borderRadius:"0",
        }),
      }}/>
      {/* Вторая переменная */}
      <Creatable placeholder={<div>Comparable...</div>} isClearable onChange={(val) => FlowStore.changeVar(id, idOfRow, 'third', val)} value={data.thirdVar}  options={Store.variables} className='nodrag child coolselect' styles={{
    control: (baseStyles, state) => ({
          ...baseStyles,
          borderRadius:"0 8px 8px 0",
        }),
      }}/>
      {renderDelete ? (
        <button className='nodrag child deleteButton' type='button' onClick={() => FlowStore.deleteRow(id, idOfRow)}>Удалить</button>) : (<div />)}
  </>
  );
}

export default observer(ChoiceRow);
