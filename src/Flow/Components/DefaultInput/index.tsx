import React from "react";
import "./DefaultInput.css"
import { DefaultInputProps } from "../../types";

// eslint-disable-next-line react/function-component-definition
const DefaultInput = ({textContent, readOnly=false} : DefaultInputProps) => {
  return (<textarea value={textContent} readOnly={readOnly} className='DefaultInput nodrag nowheel'/>);
}

export default DefaultInput
